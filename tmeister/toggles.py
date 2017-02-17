import asyncio

from aiohttp import web

from .dataaccess import toggleda
from .dataaccess import environmentda
from .dataaccess import featureda
from . import auditing
from . import permissions


async def get_toggle_states_for_env(request):
    params = request.GET

    env = request.match_info['name']
    features = params.getall('feature', tuple())
    if not features:
        return web.json_response({'Message': "No features provided"},
                                 status=400)
    else:
        result = await toggleda.get_toggle_states_for_env(env, features)
        for f in features:
            if f not in result.keys():
                # Everything not in the database is assumed off,
                # even if it doesn't exist
                result[f] = False
    return web.json_response(result,
                             headers={'Access-Control-Allow-Origin': '*'})


async def set_toggle_state(request):
    body = await request.json()
    toggle = body.get('toggle')
    if not toggle:
        return web.json_response({'Message': "No toggle provided"},
                                 status=400)

    env = toggle.get('env')
    feature = toggle.get('feature')
    state = toggle.get('state')
    user = request.get('user')

    if (not env or not env.isidentifier() or
            not await environmentda.get_envs(env_list=[env])):
        return web.json_response({'Message': "No valid environment provided"},
                                 status=400)
    if (not feature or not feature.isidentifier() or
            not await featureda.get_features(feature_list=[feature])):
        return web.json_response({'Message': "No valid feature provided"},
                                 status=400)
    if state not in ('OFF', 'ON'):
        return web.json_response({'Message': "No valid state provided"},
                                 status=400)

    # get current state
    current = await toggleda.get_toggle_states_for_env(env, [feature])
    if not current:
        current_state = 'OFF'
    else:
        current_state = 'ON'

    if current_state != state:
        await permissions.check_toggle_permissions(user, env)
        if env == 'Production' and state == 'ON':
            await _toggle_all_for_feature(feature, state='ON')
        else:
            await toggleda.set_toggle_state(env, feature, state)
        await auditing.audit_event(
            'toggle.switch', user,
            {'toggle_env': env, 'toggle_feature': feature, 'new_state': state})

    return await get_all_toggle_states()


async def get_all_toggle_states(request=None):
    toggle_list = await toggleda.get_all_toggles()
    return web.json_response(toggle_list)


async def _toggle_all_for_feature(feature, *, state):
    envs = await environmentda.get_envs()
    await asyncio.wait(
        [toggleda.set_toggle_state(e, feature, state)
         for e in envs]
    )
