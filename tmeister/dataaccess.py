import json

from asyncpgsa import pg

from . import db

OFF_STATE = 0
ON_STATE = 1
ROLLING_STATE = 4


async def add_env(env_name):
    await pg.fetchval(db.environments.insert().values(name=env_name))
    return {'name': env_name}


async def get_envs(*, env_list=None):
    query = db.environments.select()
    if env_list:
        query = query.where(db.environments.c.name.in_(env_list))

    envs = await pg.fetch(query)
    return [row.name for row in envs]


async def get_features(*, feature_list=None):
    query = db.features.select()
    if feature_list:
        query = query.where(db.features.c.name.in_(feature_list))

    features = await pg.fetch(query)
    return [row.name for row in features]


async def add_feature(feature_name):
    await pg.fetchval(db.features.insert().values(name=feature_name))
    return {'name': feature_name}


async def delete_feature(feature_name):
    await pg.fetchval(
        db.features.delete()
            .where(db.features.c.name == feature_name))


async def delete_env(env_name):
    await pg.fetchval(db.environments.delete()
                      .where(db.environments.c.name == env_name))

    await pg.fetchval(db.toggles.delete()
                      .where(db.toggles.c.env == env_name))


async def get_toggle_states_for_env(env, list_of_features):
    query = db.toggles.select() \
        .where(db.toggles.c.env == env) \
        .where(db.toggles.c.feature.in_(list_of_features))

    results = {}
    async with pg.query(query) as cursor:
        async for row in cursor:
            results[row.feature] = row.state == 'ON'

    return results


def _transform_toggles(toggles):
    return [
        {'toggle':
            {'env': row.env,
             'feature': row.feature,
             'state': row.state}}
        for row in toggles]


async def set_toggle_state(env, feature, state):
    results = await pg.fetch(
        db.toggles.select()
          .where(db.toggles.c.feature == feature)
          .where(db.toggles.c.env == env))

    results = _transform_toggles(results)
    if not results:
        if state == 'ON':
            await pg.fetchval(
                db.toggles.insert().values(feature=feature, env=env, state='ON')
            )
    elif state == 'OFF':
        await pg.fetchval(db.toggles
                          .delete()
                          .where(db.toggles.c.feature == feature)
                          .where(db.toggles.c.env == env))
    return {
        'toggle': {
            'env': env,
            'feature': feature,
            'state': state,
        }
    }


async def audit_event(event, user, event_data, date):
    await pg.fetchval(db.auditing.insert().values(
        event=event,
        user=user,
        date=date,
        event_data=event_data)
    )

async def get_recent_audits():
    query = db.auditing.select().order_by(db.auditing.c.date.desc()).limit(50)
    results = await pg.fetch(query)
    return [
        {'event': row.event,
         'user': row.user,
         'date': row.date,
         'event_data': json.loads(row.event_data),
         }
        for row in results
    ]


async def get_all_toggles():
    query = """\
SELECT
  environments.name AS env,
  features.name AS feature,
  CASE
    WHEN environments.name = 'dev' THEN 'ON'
    WHEN toggles.state IS NULL THEN 'OFF'
    ELSE toggles.state
    END AS state
FROM environments
CROSS JOIN features
LEFT OUTER JOIN toggles ON feature = features.name
  AND env = environments.name;\
"""

    toggles = await pg.fetch(query)
    results = [
        {'toggle': {'env': row.env,
                    'feature': row.feature,
                    'state': row.state}
         }
        for row in toggles
        ]
    return {'toggles': results}
