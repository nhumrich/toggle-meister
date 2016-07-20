"""
Right now this is just a bunch of static objects in memory. Later, this should
use an actual database
"""
import asyncio
from collections import defaultdict
from .db import DB, KeyAlreadyExistsError
__toggles = []
__envs = []
__switches = defaultdict(dict)

OFF_STATE = 0
ON_STATE = 1
ROLLING_STATE = 4

db = DB()


async def add_env(env_name):
    await db.go(db.environments.insert().values(name=env_name))
    return {'name': env_name}


async def get_envs(*, env_list=None):
    async def get_envs_(envs):
        return [row.name for row in envs]

    query = db.environments.select()
    if env_list:
        query = query.where(db.environments.c.name.in_(env_list))

    result = await db.go(query, callback=get_envs_)
    return result


async def get_features(*, feature_list=None):
    async def get_features_(features):
        return [row.name for row in features]

    query = db.features.select()
    if feature_list:
        query = query.where(db.features.c.name.in_(feature_list))

    result = await db.go(query,
                         callback=get_features_)
    return result


async def add_feature(feature_name):
    await db.go(db.features.insert().values(name=feature_name))
    return {'name': feature_name}


async def delete_feature(feature_name):
    await db.go(db.features.delete().where(db.features.c.name == feature_name))


async def delete_env(env_name):
    await db.go(db.environments.delete()
                .where(db.environments.c.name == env_name))

    await db.go(db.toggles.delete().where(db.toggles.c.env == env_name))

async def get_toggle_states_for_env(env, list_of_features):
    async def _get_toggle_states(toggles):
        return {row.feature: row.state for row in toggles}

    query = db.toggles.select()\
        .where(db.toggles.c.env == env)\
        .where(db.toggles.c.feature.in_(list_of_features))

    results = await db.go(query, callback=_get_toggle_states)
    return results


async def _get_toggles_(toggles):
    return [{'toggle': {'env': row.env, 'feature': row.feature, 'state': row.state}}
            for row in toggles]

async def set_toggle_state(env, feature, state):

    results = await db.go(db.toggles
                          .select()
                          .where(db.toggles.c.feature == feature)
                          .where(db.toggles.c.env == env),
                          callback=_get_toggles_)

    if not results:
        if state == 'ON':
            await db.go(db.toggles
                        .insert()
                        .values(feature=feature, env=env, state='ON'))
    elif state == 'OFF':
        await db.go(db.toggles
                    .delete()
                    .where(db.toggles.c.feature == feature)
                    .where(db.toggles.c.env == env))
    return {
        'toggle': {
            'env': env,
            'feature': feature,
            'state': state
        }
    }


async def get_all_toggles():
    query = """\
SELECT
  environments.name as env,
  features.name as feature,
  CASE WHEN toggles.state IS NULL THEN 'OFF'
    ELSE toggles.state
    END as state
FROM environments
CROSS JOIN features
LEFT OUTER JOIN toggles ON feature = features.name AND env = environments.name;\
"""

    print(query)
    results = await db.go(query, callback=_get_toggles_)
    return {'toggles': results}


async def create_toggle(toggle_name):
    await asyncio.sleep(0)
    __toggles.append(toggle_name)


