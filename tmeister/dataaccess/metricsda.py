from datetime import date
import traceback

from sqlalchemy import text
from sqlalchemy.dialects.postgresql import insert
from asyncpgsa import pg
from . import db


async def increment_metrics(feature: str, env: str, date_: date):
    upsert = insert(db.metrics).values(feature=feature, env=env, date=date_) \
        .on_conflict_do_update(
            index_elements=[db.metrics.c.env, db.metrics.c.feature, db.metrics.c.date],
            set_={'hit_count': text('metrics.hit_count + 1')}
    )

    try:
        async with pg.transaction() as conn:
            await conn.fetch(upsert)
    except Exception:
        traceback.print_exc()
        pass


async def remove_metrics(feature=None, environment=None):
    delete = db.metrics.delete()
    if feature:
        delete.where(db.metrics.c.feature == feature)
    if environment:
        delete.where(db.metrics.c.env == environment)

    await pg.fetchval(delete)


async def get_metrics_for_feature(feature, environments=None):
    query = db.metrics.select().where(db.metrics.c.feature == feature)
    if environments:
        query.where(db.metrics.c.env.in_(environments))

    results = await pg.fetch(query)

    metrics = []
    for row in results:
        metrics.append({'date': row['date'], 'hit_count': row['hit_count'],
                        'environment': row['env']})

    return metrics
