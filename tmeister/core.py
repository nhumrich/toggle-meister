import os
import pathlib
import secrets
from json import JSONDecodeError

import uvicorn
from asyncpgsa import pg
from starlette.applications import Starlette
from starlette.staticfiles import StaticFiles
from starlette.middleware.sessions import SessionMiddleware
from starlette.responses import HTMLResponse, JSONResponse
from starlette.middleware.authentication import AuthenticationMiddleware
from sentry_asgi import SentryMiddleware
import sentry_sdk

from . import toggles, features, environments, auditing, health, metrics, releases
from .permissions import InsufficientPermissionsError
from .security import GoogleAuthBackend


DEBUG = os.getenv('DEBUG', 'false').lower() == 'true'
LOCAL_DEV = os.getenv('IS_LOCAL', 'false').lower() == 'true'
GOOGLE_ID = os.getenv('GOOGLE_ID')
GOOGLE_SECRET = os.getenv('GOOGLE_SECRET')
GOOGLE_ORG = os.getenv('GOOGLE_ORG')
COOKIE_NAME = os.getenv('COOKIE_NAME', 'tmeister-auth')
COOKIE_KEY = os.getenv('COOKIE_KEY') or secrets.randbits(60)
POSTGRES_URL = os.getenv('DATABASE_URL', 'localhost')
POSTGRES_USERNAME = os.getenv('DATABASE_USER', 'postgres')
POSTGRES_PASSWORD = os.getenv('DATABASE_PASS', 'password')
POSTGRES_DB_NAME = os.getenv('DATABASE_DB_NAME', 'postgres')
POSTGRES_MIN_POOL_SIZE = int(os.getenv('DATABASE_MIN_POOL_SIZE', '2'))
POSTGRES_MAX_POOL_SIZE = int(os.getenv('DATABASE_MAX_POOL_SIZE', '4'))
SENTRY_URL = os.getenv('SENTRY_URL')
ENV_NAME = os.getenv('ENV_LOCATION', 'Local')


if (not LOCAL_DEV) and None in (GOOGLE_ID, GOOGLE_SECRET, GOOGLE_ORG):
    raise ValueError('GITHUB_ID, GITHUB_SECRET or GITHUB_ORG'
                     ' environment variables are missing')


async def pg_init():
    await pg.init(
        user=POSTGRES_USERNAME,
        password=POSTGRES_PASSWORD,
        host=POSTGRES_URL,
        database=POSTGRES_DB_NAME,
        min_size=POSTGRES_MIN_POOL_SIZE,
        max_size=POSTGRES_MAX_POOL_SIZE,
    )


def init():
    app = Starlette()

    @app.on_event("startup")
    async def async_setup():
        await pg_init()

    @app.exception_handler(JSONDecodeError)
    async def bad_json(request, exc):
        return JSONResponse({'reason': 'invalid json', 'details': str(exc)}, status_code=400)

    @app.exception_handler(InsufficientPermissionsError)
    async def handle_permissions(request, exc):
        return JSONResponse({'reason': 'you are not authorized to do that dave'}, status_code=403)

    # auth stuff
    auth = GoogleAuthBackend(GOOGLE_ID, GOOGLE_SECRET, GOOGLE_ORG)
    app.add_middleware(AuthenticationMiddleware,
                       backend=auth,
                       on_error=auth.on_error)

    app.add_middleware(SessionMiddleware, session_cookie=COOKIE_NAME,
                       secret_key=COOKIE_KEY, https_only=not LOCAL_DEV,
                       max_age=2 * 24 * 60 * 60)  # 2 days

    # sentry stuff
    sentry_sdk.init(dsn=SENTRY_URL, environment=ENV_NAME)
    app.add_middleware(SentryMiddleware)

    async def index_html(request):
        static = pathlib.Path('tmeister/static/index.html')
        return HTMLResponse(static.read_text())

    app.add_route('/api/envs/{name}/toggles', toggles.get_toggle_states_for_env, methods=['GET'])
    app.add_route('/api/toggles', toggles.get_all_toggle_states, methods=['GET'])
    app.add_route('/api/toggles', toggles.set_toggle_state, methods=['PATCH'])
    app.add_route('/api/features', features.get_features)
    app.add_route('/api/features', features.create_feature, methods=['POST'])
    app.add_route('/api/features/{name}', features.delete_feature, methods=['DELETE'])
    app.add_route('/api/envs', environments.get_envs)
    app.add_route('/api/envs', environments.add_env, methods=['POST'])
    app.add_route('/api/envs/{name}', environments.delete_env, methods=['DELETE'])
    app.add_route('/api/auditlog', auditing.get_audit_events)
    app.add_route('/api/metrics/{name}', metrics.get_metrics_for_feature, methods=['GET'])
    app.add_route('/api/envs/{name}/release_notes', releases.get_release_notes_for_env, methods=['GET'])
    app.add_route('/api/release_notes', releases.get_all_release_notes, methods=['GET'])
    app.add_route('/api/release_notes', releases.create_release_note, methods=['POST'])
    app.add_route('/api/release_notes/{id}', releases.delete_release_note, methods=['DELETE'])
    app.add_route('/api/release_notes/{id}', releases.edit_release_note, methods=['PATCH'])
    app.add_route('/heartbeat', health.get_health)
    app.add_route('/', index_html)

    app.mount('/', app=StaticFiles(directory='tmeister/static'), name='static')

    return app


def main(app=None):
    # setup
    if app is None:
        app = init()

    kwargs = {}
    if LOCAL_DEV:
        kwargs['reload'] = True
    else:
        kwargs['workers'] = 2

    uvicorn.run(app, host='0.0.0.0', http='h11', port=8445, headers=[('Server', 'tmeister')],
                proxy_headers=True, **kwargs)


if __name__ == '__main__':
    main()
