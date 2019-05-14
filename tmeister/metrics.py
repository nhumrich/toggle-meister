import asyncio

from datetime import date

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


async def get_metrics_for_feature(request):
    """ TODO finish this method """
    pass
    # feature = request.path_params.get('name').lower()
    # user = request.user.display_name
