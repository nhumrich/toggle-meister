from aiohttp import web

from . import dataaccess
from asyncpg.exceptions import UniqueViolationError


async def get_envs(request):
    env_list = await dataaccess.get_envs()
    envs = {'envs': [{'name': e} for e in env_list]}
    return web.json_response(envs)


async def add_env(request):
    body = await request.json()
    env_name = body.get('name', None)

    if not env_name.isidentifier():
        return web.json_response({'Message': "Not a valid name"},
                                 status=400)

    try:
        response = await dataaccess.add_env(env_name)
        return web.json_response(response, status=201)

    except UniqueViolationError as e:
        return web.json_response(
            {'Message': "The environment name '{}' already exists"
                .format(env_name)},
            status=409)


async def delete_env(request):
    env = request.match_info['name']
    await dataaccess.delete_env(env)
    return web.HTTPNoContent()
