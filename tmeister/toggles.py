import asyncio

# from aiohttp import web
from starlette.responses import JSONResponse
from starlette.requests import Request

from .dataaccess import toggleda
from .dataaccess import environmentda
from .dataaccess import featureda
from . import auditing
from . import permissions
from . import metrics


async def get_toggle_states_for_env(request: Request):
    params = request.query_params

    env = request.path_params.get('name').lower()
    features = [feature.lower() for feature in params.getlist('feature')]
    track = params.get('metrics', 'true').lower() == 'true'
    enrollment_id = params.get('enrollment_id')

    if not features:
        return JSONResponse({'Message': "No features provided"},
                            status_code=400)
    else:
        result = await toggleda.get_toggle_states_for_env(env, features, user_id=enrollment_id)
        for f in features:
            if f not in result.keys():
                # Everything not in the database is assumed off,
                # even if it doesn't exist
                result[f] = False

    if track:
        metrics.track_metrics(features, env)

    return JSONResponse(result,
                        headers={'Access-Control-Allow-Origin': '*'})


async def set_toggle_state(request):
    body = await request.json()
    toggle = body.get('toggle')
    if not toggle:
        return JSONResponse({'Message': "No toggle provided"},
                            status_code=400)

    env = toggle.get('env').lower()
    feature = toggle.get('feature').lower()
    state = toggle.get('state')
    user = request.user.display_name
    days = 0

    await permissions.check_permissions(user, permissions.Action.toggle)

    if state.startswith('ROLL'):
        if ':' not in state:
            return JSONResponse(
                {'Message': "Rollouts must include number of days, such as 'ROLL:2' for 2 days."})

        state, days, *_ = state.split(':')

    if (not env or not env.isidentifier() or
            not await environmentda.get_envs(env_list=[env])):
        return JSONResponse({'Message': "No valid environment provided"},
                            status_code=400)
    if (not feature or not feature.isidentifier() or
            not await featureda.get_features(feature_list=[feature])):
        return JSONResponse({'Message': "No valid feature provided"},
                            status_code=400)
    if state not in ('OFF', 'ON', 'ROLL'):
        return JSONResponse({'Message': "No valid state provided"},
                            status_code=400)

    # get current state
    current = await toggleda.get_toggle_states_for_env(env, [feature])
    if not current:
        current_state = 'OFF'
    else:
        current_state = 'ON'

    if current_state != 'OFF' and state == 'ROLL':
        return JSONResponse({'Message': "You can only roll a feature that is currently off"})

    if env == 'production' and state in ('ON', 'ROLL'):
        if state == 'ON':
            await _toggle_all_for_feature(feature, state='ON')
        if state == 'ROLL':
            await _toggle_all_for_feature(feature, state='ON', except_for='production')
            await toggleda.set_toggle_state(env, feature, state, rollout_days=days)
    else:
        await toggleda.set_toggle_state(env, feature, state, rollout_days=days)
    await auditing.audit_event(
        'toggle.switch', user,
        {'toggle_env': env, 'toggle_feature': feature, 'new_state': state, 'over_x_days': days})

    return await get_all_toggle_states()


async def get_all_toggle_states(request=None):
    toggle_list = await toggleda.get_all_toggles()
    return JSONResponse(toggle_list)


async def _toggle_all_for_feature(feature, *, state, except_for=None):
    envs = await environmentda.get_envs()
    if except_for:
        envs.remove(except_for)
    await asyncio.wait(
        [toggleda.set_toggle_state(e, feature, state)
         for e in envs]
    )
