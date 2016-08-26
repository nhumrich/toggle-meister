import os
import json

import asyncio
import aiogithubauth
from aiohttp import web
from aiohttp_index import IndexMiddleware
from asyncpgsa import pg

from . import toggles, features, environments

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
POSTGRES_MIN_POOL_SIZE = os.getenv('DATABASE_MIN_POOL_SIZE', 2)
POSTGRES_MAX_POOL_SIZE = os.getenv('DATABASE_MAX_POOL_SIZE', 4)


if (not LOCAL_DEV) and None in (GH_ID, GH_SECRET, GH_ORG):
    raise ValueError('GITHUB_ID, GITHUB_SECRET or GITHUB_ORG'
                     ' environment variables are missing')


async def error_middleware(app, handler):
    async def middleware_handler(request):
        try:
            response = await handler(request)
        except json.decoder.JSONDecodeError as e:
            return web.json_response(data={'Message': e.msg}, status=400)
        return response
    return middleware_handler


async def async_setup(loop):

    await pg.init(
        user=POSTGRES_USERNAME,
        password=POSTGRES_PASSWORD,
        host=POSTGRES_URL,
        database=POSTGRES_DB_NAME,
        # loop=loop,
        min_size=POSTGRES_MIN_POOL_SIZE,
        max_size=POSTGRES_MAX_POOL_SIZE,
    )


def init():
    loop = asyncio.get_event_loop()
    loop.run_until_complete(async_setup(loop))

    app = web.Application(middlewares=[
        error_middleware,
        IndexMiddleware()])

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
    app.router.add_route('GET', '/api/envs/{name}/toggles',
                         toggles.get_toggle_states_for_env)
    app.router.add_route('GET', '/api/toggles', toggles.get_all_toggle_states)
    app.router.add_route('PATCH', '/api/toggles', toggles.set_toggle_state)
    app.router.add_route('GET', '/api/features', features.get_features)
    app.router.add_route('POST', '/api/features', features.create_feature)
    app.router.add_route('DELETE', '/api/features/{name}',
                         features.delete_feature)
    app.router.add_route('GET', '/api/envs', environments.get_envs)
    app.router.add_route('POST', '/api/envs', environments.add_env)
    app.router.add_route('DELETE', '/api/envs/{name}', environments.delete_env)
    app.router.add_static('/', os.path.dirname(__file__) + '/static')
    return app


def main():
    # setup
    app = init()
    loop = asyncio.get_event_loop()

    handler = app.make_handler(debug=DEBUG)
    loop.run_until_complete(
        loop.create_server(handler, '0.0.0.0', 8445)
    )
    print('======= Server running at :8445 =======')

    if DEBUG:
        import aiohttp_autoreload
        print('debug enabled, auto-reloading enabled')
        aiohttp_autoreload.start()

    # Run server
    try:
        loop.run_forever()
    except KeyboardInterrupt:
        loop.stop()
        loop.close()

if __name__ == '__main__':
    main()












