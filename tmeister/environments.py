# from aiohttp import web
from starlette.responses import JSONResponse

from asyncpg.exceptions import UniqueViolationError

from . import permissions
from .dataaccess import environmentda
from . import auditing
from . import metrics


async def get_envs(request):
    env_list = await environmentda.get_envs()
    envs = {'envs': [{'name': e} for e in env_list]}
    return JSONResponse(envs)


async def add_env(request):
    body = await request.json()
    env_name = body.get('name', '').lower()
    user = request.user.display_name

    if not env_name.isidentifier():
        return JSONResponse({'Message': "Not a valid name"},
                            status_code=400)

    await permissions.check_permissions(user, permissions.Action.create_env)
    try:
        response = await environmentda.add_env(env_name)
        await auditing.audit_event(
            'environment.add', user, {'env_name': env_name})
        return JSONResponse(response, status_code=201)

    except UniqueViolationError:
        return JSONResponse(
            {'Message': "The environment name '{}' already exists"
                .format(env_name)},
            status_code=409)


async def delete_env(request):
    env = request.path_params.get('name').lower()
    user = request.user.display_name

    await permissions.check_permissions(user, permissions.Action.delete_env)

    # remove metrics
    await metrics.remove_metrics(environment=env)

    await environmentda.delete_env(env)
    await auditing.audit_event(
        'environment.remove', user, {'env_name': env})
    return JSONResponse(status_code=204)
