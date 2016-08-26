import asyncio

from aiohttp import web

from . import dataaccess
import urllib


async def get_toggle_states_for_env(request):
    params = urllib.parse.parse_qs(request.query_string)

    env = request.match_info['name']
    features = params.get('feature', None)
    if not features:
        return web.json_response({'Message': "No features provided"},
                                 status=400)
    if env == 'dev':
        result = {feature: True for feature in features}
    else:
        result = await dataaccess.get_toggle_states_for_env(env, features)
        for f in features:
            if f not in result.keys():
                # Everything not in the database is assumed off,
                # even if it doesn't exist
                result[f] = False
    return web.json_response(result)


async def set_toggle_state(request):
    body = await request.json()
    toggle = body.get('toggle', None)
    if not toggle:
        return web.json_response({'Message': "No toggle provided"},
                                 status=400)

    env = toggle.get('env', None)
    feature = toggle.get('feature', None)
    state = toggle.get('state', None)

    if (not env or not env.isidentifier() or
            not await dataaccess.get_envs(env_list=[env])):
        return web.json_response({'Message': "No valid environment provided"},
                                 status=400)
    if (not feature or not feature.isidentifier() or
            not await dataaccess.get_features(feature_list=[feature])):
        return web.json_response({'Message': "No valid feature provided"},
                                 status=400)
    if state not in ('OFF', 'ON'):
        return web.json_response({'Message': "No valid state provided"},
                                 status=400)

    if env == 'Production' and state == 'ON':
        calls = []
        envs = await dataaccess.get_envs()
        print(envs)
        for env in envs:
            calls.append(
                dataaccess.set_toggle_state(env, feature, 'ON')
            )
        await asyncio.wait(calls)
    else:
        await dataaccess.set_toggle_state(env, feature, state)

    all_toggles = await dataaccess.get_all_toggles()
    return web.json_response(all_toggles)


async def get_all_toggle_states(request):
    toggle_list = await dataaccess.get_all_toggles()
    return web.json_response(toggle_list)
