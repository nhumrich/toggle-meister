import os
import json

import aiogithubauth
from aiohttp import web
from aiohttp_index import IndexMiddleware
from asyncpgsa import pg
from raven import Client
from raven_aiohttp import AioHttpTransport

from . import toggles, features, environments, auditing

DEBUG = os.getenv('DEBUG', 'false').lower() == 'true'
LOCAL_DEV = os.getenv('IS_LOCAL', 'false').lower() == 'true'
GH_ID = os.getenv('GITHUB_ID')
GH_SECRET = os.getenv('GITHUB_SECRET')
GH_ORG = os.getenv('GITHUB_ORG')
COOKIE_NAME = os.getenv('COOKIE_NAME', 's3githubauth')
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


async def error_middleware(app, handler):
    async def middleware_handler(request: web.Request):
        try:
            response = await handler(request)
        except json.decoder.JSONDecodeError as e:
            return web.json_response(data={'Message': e.msg}, status=400)
        except Exception as e:
            if app.raven:
                data = {
                    'request': {
                        'method': request.method,
                        'data': None,
                        'query_string': request.query_string,
                        'url': request.path
                    },
                    # 'user': {
                    #     # put user data here
                    #     'id': 3,
                    #     'username': 'myuser',
                    # }
                }
                tags = {
                    # Put things you want to filter by in sentry here
                }
                extra_data = {
                    # Put extra data here
                }
                if request.has_body:
                    data['request']['data'] = await request.text()

                app.raven.captureException(extra=extra_data,
                                           tags=tags, data=data)
            raise
        return response
    return middleware_handler


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

    if not LOCAL_DEV:
        aiogithubauth.add_github_auth_middleware(
            app,
            github_id=GH_ID,
            github_secret=GH_SECRET,
            github_org=GH_ORG,
            cookie_name=COOKIE_NAME,
            cookie_key=COOKIE_KEY,
            whitelist_handlers=[toggles.get_toggle_states_for_env],
            api_unauthorized=True
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


def main():
    # setup
    app = init()

    if DEBUG:
        import aiohttp_autoreload
        print('debug enabled, auto-reloading enabled')
        aiohttp_autoreload.start()

    # Run server
    web.run_app(app, port=8445)

if __name__ == '__main__':
    main()
