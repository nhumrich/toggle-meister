import os

import aiohttp_oauth
from aiohttp import web
from aiohttp_index import IndexMiddleware
from asyncpgsa import pg
from raven import Client
from raven_aiohttp import AioHttpTransport

from . import toggles, features, environments, auditing, employees
from .errorhandling import error_middleware

DEBUG = os.getenv('DEBUG', 'false').lower() == 'true'
LOCAL_DEV = os.getenv('IS_LOCAL', 'false').lower() == 'true'
GH_ID = os.getenv('GITHUB_ID')
GH_SECRET = os.getenv('GITHUB_SECRET')
GH_ORG = os.getenv('GITHUB_ORG')
COOKIE_NAME = os.getenv('COOKIE_NAME', 'tmeister-auth')
COOKIE_KEY = os.getenv('COOKIE_KEY')
POSTGRES_URL = os.getenv('DATABASE_URL', 'localhost')
POSTGRES_USERNAME = os.getenv('DATABASE_USER', 'postgres')
POSTGRES_PASSWORD = os.getenv('DATABASE_PASS', 'password')
POSTGRES_DB_NAME = os.getenv('DATABASE_DB_NAME', 'postgres')
POSTGRES_MIN_POOL_SIZE = int(os.getenv('DATABASE_MIN_POOL_SIZE', '2'))
POSTGRES_MAX_POOL_SIZE = int(os.getenv('DATABASE_MAX_POOL_SIZE', '4'))
SENTRY_URL = os.getenv('SENTRY_URL')
ENV_NAME = os.getenv('ENV_LOCATION', 'Local')


if (not LOCAL_DEV) and None in (GH_ID, GH_SECRET, GH_ORG):
    raise ValueError('GITHUB_ID, GITHUB_SECRET or GITHUB_ORG'
                     ' environment variables are missing')


async def async_setup(app):

    await pg.init(
        user=POSTGRES_USERNAME,
        password=POSTGRES_PASSWORD,
        host=POSTGRES_URL,
        database=POSTGRES_DB_NAME,
        min_size=POSTGRES_MIN_POOL_SIZE,
        max_size=POSTGRES_MAX_POOL_SIZE,
    )


def init():
    app = web.Application(middlewares=[
        IndexMiddleware(),
        error_middleware,
    ])

    app.on_startup.append(async_setup)

    oauth_kwargs = dict(
        github_id=GH_ID,
        github_secret=GH_SECRET,
        github_org=GH_ORG,
        cookie_name=COOKIE_NAME,
        cookie_key=COOKIE_KEY,
        whitelist_handlers=[toggles.get_toggle_states_for_env],
        oauth_url='/oauth_callback/github',
        auth_callback=employees.check_employee,
        cookie_is_secure=True
    )
    if LOCAL_DEV:
        oauth_kwargs['dummy'] = True
        oauth_kwargs['cookie_is_secure'] = False

    aiohttp_oauth.add_oauth_middleware(
        app,
        **oauth_kwargs
    )

    app.router.add_get('/api/envs/{name}/toggles',
                       toggles.get_toggle_states_for_env)
    app.router.add_get('/api/toggles', toggles.get_all_toggle_states)
    app.router.add_patch('/api/toggles', toggles.set_toggle_state)
    app.router.add_get('/api/features', features.get_features)
    app.router.add_post('/api/features', features.create_feature)
    app.router.add_delete('/api/features/{name}',
                          features.delete_feature)
    app.router.add_get('/api/envs', environments.get_envs)
    app.router.add_post('/api/envs', environments.add_env)
    app.router.add_delete('/api/envs/{name}', environments.delete_env)
    app.router.add_get('/api/auditlog', auditing.get_audit_events)

    # Add static handler
    app.router.add_static('/', os.path.dirname(__file__) + '/static')

    client = None
    if SENTRY_URL:
        client = Client(SENTRY_URL, transport=AioHttpTransport,
                        environment=ENV_NAME)
    app.raven = client
    return app


def main(app=None):
    # setup
    if app is None:
        app = init()

    if DEBUG:
        import aiohttp_autoreload
        print('debug enabled, auto-reloading enabled')
        aiohttp_autoreload.start()

    # Run server
    web.run_app(app, port=8445)

if __name__ == '__main__':
    main()
