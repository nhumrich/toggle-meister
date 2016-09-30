from aiohttp import web

from asyncpg.exceptions import UniqueViolationError

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
    await environmentda.delete_env(env)
    await auditing.audit_event(
        'environment.remove', user, {'env_name': env})
    return web.HTTPNoContent()
