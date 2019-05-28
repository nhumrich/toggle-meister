import asyncio

from datetime import date
from starlette.requests import Request
from starlette.responses import JSONResponse

from .dataaccess import metricsda


def track_metrics(features, environment):
    date_ = date.today()
    if isinstance(features, str):
        features = [features]

    for feature in features:
        asyncio.create_task(metricsda.increment_metrics(feature, environment, date_))


async def remove_metrics(*, feature=None, environment=None):
    if feature is None and environment is None:
        raise ValueError("Either feature or environment should be provided")

    await metricsda.remove_metrics(feature=None, environment=None)


async def get_metrics_for_feature(request: Request):
    feature = request.path_params.get('name').lower()
    envs = [env.lower() for env in
            request.query_params.getlist('environment') if env.isidentifier()]

    if not feature.isidentifier():
        return JSONResponse({'Message': "Not a valid feature name"},
                            status_code=400)

    results = await metricsda.get_metrics_for_feature(feature, environments=envs)
    for d in results:
        date = d['date']
        d['date'] = f'{date}'
    return JSONResponse({'metrics': results})

