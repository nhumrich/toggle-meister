from aiohttp import web
from tmeister.dataaccess import toggleda, featureda

from asyncpg.exceptions import UniqueViolationError

from . import permissions
from .dataaccess import environmentda
from . import auditing


async def get_envs(request):
    env_list = await environmentda.get_envs()
    envs = {'envs': [{'name': e} for e in env_list]}
    return web.json_response(envs)


async def add_env(request):
    body = await request.json()
    env_name = body.get('name', None)
    user = request.get('user')

    if not env_name.isidentifier():
        return web.json_response({'Message': "Not a valid name"},
                                 status=400)

    await permissions.check_permissions(user, permissions.Action.create_env)
    try:
        response = await environmentda.add_env(env_name)
        await auditing.audit_event(
            'environment.add', user, {'env_name': env_name})
        return web.json_response(response, status=201)

    except UniqueViolationError as e:
        return web.json_response(
            {'Message': "The environment name '{}' already exists"
                .format(env_name)},
            status=409)


async def delete_env(request):
    env = request.match_info['name']
    user = request.get('user')

    await permissions.check_permissions(user, permissions.Action.delete_env)

    await environmentda.delete_env(env)
    await auditing.audit_event(
        'environment.remove', user, {'env_name': env})
    return web.HTTPNoContent()


async def compare_envs(request):
    params = request.GET
    env_a_name = request.match_info['name']
    env_b_name = params.get('compare_to')

    all_features = await featureda.get_features()
    env_a_toggles = await toggleda.get_toggle_states_for_env(env_a_name, all_features)
    env_b_toggles = await toggleda.get_toggle_states_for_env(env_a_name, all_features)

    difference = []
    for toggle_a_name, toggle_a_val in env_a_toggles.items():
        for toggle_b_name, toggle_b_val in env_b_toggles.items():
            if toggle_b_name == toggle_a_name:
                if toggle_a_val != toggle_b_val:
                    difference.append(
                        (toggle_a_name, toggle_a_val, toggle_b_val))

    result = {}
    for name, a, b in difference:
        result[name] = {env_a_name: a, env_b_name: b}

    return web.json_response({'diff': result})
