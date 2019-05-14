from starlette.requests import Request
from starlette.responses import JSONResponse
from asyncpg.exceptions import UniqueViolationError

from .dataaccess import featureda
from . import permissions
from . import toggles
from . import auditing
from . import metrics


async def create_feature(request):
    body = await request.json()
    feature_name = body.get('name', '').lower()
    user = request.user.display_name
    if not feature_name.isidentifier():
        return JSONResponse({'Message': "Not a valid name"},
                            status_code=400)

    await permissions.check_permissions(
        user, permissions.Action.create_feature)
    if await featureda.is_feature_soft_deleted(feature_name):
        # delete the feature first
        await _do_hard_feature_delete(feature_name)
    try:
        response = await featureda.add_feature(feature_name, user)
        await auditing.audit_event(
            'feature.add', user, {'feature_name': feature_name})
        return JSONResponse(response, status_code=201)

    except UniqueViolationError:
        return JSONResponse(
            {'Message': "The feature name '{}' already exists"
                .format(feature_name)},
            status_code=409)


async def get_features(request):
    feature_list = await featureda.get_features()
    features = {'features': [{'name': f} for f in feature_list]}
    return JSONResponse(features, headers={'Access-Control-Allow-Origin': '*'})


async def delete_feature(request: Request):
    feature = request.path_params.get('name').lower()
    user = request.user.display_name
    hard_delete = request.query_params.get('hard', '') == 'true'

    if not feature.isidentifier():
        return JSONResponse({'Message': 'No valid feature provided'})

    if hard_delete:
        await permissions.check_permissions(
            user, permissions.Action.hard_delete_feature)

        await _do_hard_feature_delete(feature)
        await auditing.audit_event(
            'feature.delete', user, {'feature_name': feature})
        return JSONResponse(None, status_code=204)
    else:

        await permissions.check_permissions(
            user, permissions.Action.delete_feature)

        # now delete the feature
        await featureda.remove_feature(feature, user)

        await auditing.audit_event(
            'feature.remove', user, {'feature_name': feature})

        return JSONResponse(None, status_code=204)


async def _do_hard_feature_delete(feature):
    # first, turn off all toggles (this cleans up the toggle db)
    await toggles._toggle_all_for_feature(feature, state='OFF')

    # remove the metrics
    await metrics.remove_metrics(feature=feature)

    # now delete the feature
    await featureda.delete_feature(feature)
