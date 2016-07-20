import asyncio
from aiohttp import web
import aiohttp_autoreload
from aiohttp_index import IndexMiddleware
import aiogithubauth
import json
import os
from . import toggles, features, environments

debug = True
local_dev = os.getenv('IS_LOCAL', 'false').lower() == 'true'
gh_id = os.getenv('GITHUB_ID')
gh_secret = os.getenv('GITHUB_SECRET')
gh_org = os.getenv('GITHUB_ORG')
cookie_name = os.getenv('COOKIE_NAME', 's3githubauth')
cookie_key = os.getenv('COOKIE_KEY')
if (not local_dev) and None in (gh_id, gh_secret, gh_org):
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


async def init(loop):
    app = web.Application(loop=loop, middlewares=[
        error_middleware,
        IndexMiddleware()])
    if not local_dev:
        aiogithubauth.add_github_auth_middleware(
            app,
            github_id=gh_id,
            github_secret=gh_secret,
            github_org=gh_org,
            cookie_name=cookie_name,
            cookie_key=cookie_key,
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

    handler = app.make_handler(debug=debug)
    await loop.create_server(handler, '0.0.0.0', 8445)
    print('======= Server running at :8445 =======')


def main():
    # setup
    loop = asyncio.get_event_loop()

    loop.run_until_complete(init(loop))

    if debug:
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












