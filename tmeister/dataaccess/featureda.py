from asyncpgsa import pg

from . import db


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
