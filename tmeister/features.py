from aiohttp import web

from asyncpg.exceptions import UniqueViolationError, ForeignKeyViolationError

from .dataaccess import featureda
from . import permissions
from . import auditing


async def create_feature(request):
    body = await request.json()
    feature_name = body.get('name', None)
    user = request.get('user')
    if not feature_name.isidentifier():
        return web.json_response({'Message': "Not a valid name"},
                                 status=400)

    await permissions.check_permissions(
        user, permissions.Action.create_feature)
    try:
        response = await featureda.add_feature(feature_name)
        await auditing.audit_event(
            'feature.add', user, {'feature_name': feature_name})
        return web.json_response(response, status=201)

    except UniqueViolationError as e:
        return web.json_response(
            {'Message': "The feature name '{}' already exists"
                .format(feature_name)},
            status=409)


async def get_features(request):
    feature_list = await featureda.get_features()
    features = {'features': [{'name': f} for f in feature_list]}
    return web.json_response(features)


async def delete_feature(request):
    feature = request.match_info['name']
    user = request.get('user')

    await permissions.check_permissions(
        user, permissions.Action.delete_feature)

    if not feature.isidentifier():
        return web.json_response({'Message': 'No valid feature provided'})

    try:
        await featureda.delete_feature(feature)
    except ForeignKeyViolationError as e:
        return web.json_response(
            {'Message': 'Feature still has toggles turned on'}, status=409)

    await auditing.audit_event(
        'feature.remove', user, {'feature_name': feature})
    return web.json_response(None, status=204)
