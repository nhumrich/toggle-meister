from asyncpgsa import pg
from sqlalchemy.sql import functions
from sqlalchemy import func

from . import db


async def get_toggle_states_for_env(env, list_of_features):
    query = db.toggles.select() \
        .where(func.lower(db.toggles.c.env) == env) \
        .where(db.toggles.c.feature.in_(list_of_features))

    return {r['feature']: r['state'] == 'ON'
            for r in await pg.fetch(query)}


async def set_toggle_state(env, feature, state):
    if env == 'production':
        # are we currently at `Production` or `production`?
        envs = [e['name'] for e in await pg.fetch(db.environments.select())]
        if 'production' in envs:
            real_env = 'production'
        elif 'Production' in envs:
            real_env = 'Production'
    else:
        real_env = env

    results = await pg.fetch(db.toggles.select()
                             .where(db.toggles.c.feature == feature)
                             .where(func.lower(db.toggles.c.env) == env))

    results = _transform_toggles(results)
    if not results:
        if state == 'ON':
            await pg.fetchval(
                db.toggles.insert()
                    .values(feature=feature, env=real_env, state='ON', date_on=functions.now())
            )
    elif state == 'OFF':
        await pg.fetchval(db.toggles
                          .delete()
                          .where(db.toggles.c.feature == feature)
                          .where(func.lower(db.toggles.c.env) == env))
    return {
        'toggle': {
            'env': env,
            'feature': feature,
            'state': state,
        }
    }


async def get_all_toggles():
    query = """\
SELECT
  environments.name AS env,
  features.name AS feature,
  CASE
    WHEN toggles.state IS NULL THEN 'OFF'
    ELSE toggles.state
    END AS state
FROM environments
CROSS JOIN features
LEFT OUTER JOIN toggles ON feature = features.name
  AND env = environments.name;\
"""

    toggles = await pg.fetch(query)
    results = []
    for row in toggles:
        env = row['env']
        if env == 'Production':
            env = 'production'

        results.append(
            {'toggle': {'env': env,
                        'feature': row['feature'],
                        'state': row['state']}
             }
        )
    return {'toggles': results}


def _transform_toggles(toggles):
    results = []
    for row in toggles:
        env = row['env']
        if env == 'Production':
            env = 'production'
        results.append(
            {
                'toggle': {
                    'env': env,
                    'feature': row['feature'],
                    'state': row['state']
                }
            }
        )

    return results
