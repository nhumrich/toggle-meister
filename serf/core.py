import asyncio
from aiohttp import web
import aiohttp_autoreload
import os
from . import toggles, features, environments

debug = True

async def init_public(loop):
    app = web.Application(loop=loop)
    app.router.add_route('GET', '/', toggles.get_toggle_states_for_env)
    handler = app.make_handler(debug=debug)
    await loop.create_server(handler, '0.0.0.0', 8444)
    print('======= Public Server running at :8444 =======')


async def init_private(loop):
    app = web.Application(loop=loop)
    app.router.add_route('GET', '/api/envs/{name}/toggles', toggles.get_toggle_states_for_env)
    app.router.add_route('GET', '/api/toggles', toggles.get_all_toggle_states)
    app.router.add_route('PUT', '/api/toggles', toggles.set_toggle_state)
    app.router.add_route('GET', '/api/features', features.get_features)
    app.router.add_route('POST', '/api/features', features.create_feature)
    app.router.add_route('DELETE', '/api/features/{name}', features.delete_feature)
    app.router.add_route('GET', '/api/envs', environments.get_envs)
    app.router.add_route('POST', '/api/envs', environments.add_env)
    app.router.add_route('DELETE', '/api/envs/{name}', environments.delete_env)
    app.router.add_static('/', os.path.dirname(__file__) + '/static/')
    handler = app.make_handler(debug=debug)
    await loop.create_server(handler, '0.0.0.0', 8445)
    print('======= Private Server running at :8445 =======')


def main():
    # setup
    loop = asyncio.get_event_loop()
    # Todo: make these run in separate processes
    # loop.run_until_complete(init_public(loop))
    loop.run_until_complete(init_private(loop))

    if debug:
        print('debug enabled, auto-reloading enabled')
        aiohttp_autoreload.start()

    # Run server
    loop.run_forever()

if __name__ == '__main__':
    main()












