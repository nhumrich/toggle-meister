from random import randint
import json

from asyncpgsa import pg
from sqlalchemy.sql import functions, text

from . import db


def calculate_toggle_state(feature, results):
    for row in results:
        if row['feature'] == feature:
            schedule = json.loads(row['schedule'])
            inc = int(schedule.get('increment'))
            chance = randint(1, 100)
            if chance <= inc:
                return True
            else:
                return False

    raise ValueError("feature not found in results")


async def get_real_toggle_states(env, list_of_features, _with_results=False):
    query = db.toggles.select() \
        .where(db.toggles.c.env == env) \
        .where(db.toggles.c.feature.in_(list_of_features))

    results = await pg.fetch(query)

    if _with_results:
        return results
    else:
        return {r['feature']: r['state'] for r in results}


async def get_toggle_states_for_env(env, list_of_features, user_id=None):
    results = await get_real_toggle_states(env, list_of_features, _with_results=True)

    states = {r['feature']: r['state'] for r in results}

    if user_id and any(v == 'ROLL' for k, v in states.items()):
        # we have a user and at least one feature is in a rolling state
        user_query = db.rollout_users.select()\
            .where(db.rollout_users.c.userid == user_id)\
            .where(db.rollout_users.c.env == env)
        user = await pg.fetchrow(user_query)
        if user is None:
            # user not yet in db
            await pg.fetchval(db.rollout_users.insert().values(
                userid=user_id, env=env, features={}))
            features = {}
        else:
            features = json.loads(user['features'])
        if features.get('-whitelisted-', False):
            # user is whitelisted to get all features on
            return {k: True for k, v in states.items()}
        new_states = {}
        for feature, state in states.items():
            if state == 'ROLL':
                if feature in features:
                    # grab stored state for user
                    states[feature] = features[feature]
                else:
                    # give them a chance to have the toggle on
                    cstate = calculate_toggle_state(feature, results)
                    states[feature] = cstate
                    new_states[feature] = cstate
            else:
                # not in a roll state, must be on
                states[feature] = True
        if new_states:
            update_query = db.rollout_users.update().values(
                features=text(f"features || '{json.dumps(new_states)}'"))\
                .where(db.rollout_users.c.userid == user_id)\
                .where(db.rollout_users.c.env == env)
            await pg.fetchval(update_query)
    else:
        # nothing is in a rolling state (or just no user provided, just return the normal states
        states = {k: v == 'ON' for k, v in states.items()}

    return states


async def set_toggle_state(env, feature, state, rollout_days=0):
    results = await pg.fetch(db.toggles.select()
                             .where(db.toggles.c.feature == feature)
                             .where(db.toggles.c.env == env))

    reply = {
        'toggle': {
            'env': env,
            'feature': feature,
            'state': state}}

    if results and results[0]['state'] == state:
        # nothing to do
        return reply
    elif not results and state == 'OFF':
        # nothing to do
        return reply

    # delete the toggle first to clean up any data
    async with pg.transaction() as conn:
        await conn.fetchval(db.toggles
                            .delete()
                            .where(db.toggles.c.feature == feature)
                            .where(db.toggles.c.env == env))

        schedule = {}
        if state == 'ROLL':
            schedule['increment'] = 1
            schedule['hours_count'] = 0
            schedule['total_hours'] = int(rollout_days) * 24
            schedule['current_percent'] = 1
        elif state == 'PAUSE':
            roll_schedule = json.loads(results[0]['schedule'])
            schedule['hours_count'] = 0
            schedule['total_hours'] = 48
            schedule['current_percent'] = roll_schedule.get('current_percent')
            schedule['rolling_state'] = roll_schedule
        else:
            schedule['dirty'] = True

        if state in ('ON', 'ROLL', 'PAUSE'):
            await conn.fetchval(
                db.toggles.insert().values(feature=feature, env=env, state=state,
                                           date_on=functions.now(), schedule=schedule)
            )
        elif state == 'OFF':
            # nothing to do, already deleted
            pass

    return reply


async def get_all_toggles():
    query = """\
SELECT
  environments.name AS env,
  features.name AS feature,
  toggles.schedule->>'total_hours' AS hours,
  toggles.schedule->>'current_percent' AS percent,
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
    results = [{'toggle': {'env': row['env'],
                           'feature': row['feature'],
                           'state': row['state'],
                           'over_x_days': int(row['hours']) / 24 if row['hours'] else 0,
                           'current_percent': int(row['percent']) if row['percent'] else 100,
                           },
                }
               for row in toggles]
    return {'toggles': results}


def _transform_toggles(toggles):
    results = [
        {'toggle': {
            'env': row['env'],
            'feature': row['feature'],
            'state': row['state']}}
        for row in toggles]

    return results
