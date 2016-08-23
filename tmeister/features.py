from aiohttp import web

from . import dataaccess
from asyncpg.exceptions import UniqueViolationError

async def create_feature(request):
    body = await request.json()
    feature_name = body.get('name', None)
    if not feature_name.isidentifier():
        return web.json_response({'Message': "Not a valid name"},
                                 status=400)

    try:
        response = await dataaccess.add_feature(feature_name)
        return web.json_response(response, status=201)

    except UniqueViolationError as e:
        return web.json_response(
            {'Message': "The feature name '{}' already exists"
                .format(feature_name)},
            status=409)


async def get_features(request):
    feature_list = await dataaccess.get_features()
    features = {'features': [{'name': f} for f in feature_list]}
    return web.json_response(features)


async def delete_feature(request):
    feature = request.match_info['name']

    if not feature.isidentifier():
        return web.json_response({'Message': 'No valid feature provided'})

    await dataaccess.delete_feature(feature)
    return web.json_response(None, status=204)
