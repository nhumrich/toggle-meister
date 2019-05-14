from asyncpgsa import pg
from sqlalchemy.sql import functions

from . import db


async def get_features(*, feature_list=None):
    query = db.features.select()
    if feature_list:
        query = query.where(db.features.c.name.in_(feature_list))

    features = await pg.fetch(query)
    return [row['name'] for row in features]


async def add_feature(feature_name, username):
    await pg.fetchval(db.features.insert().values(name=feature_name,
                                                  created_on=functions.now(),
                                                  created_by=username))
    return {'name': feature_name}


async def delete_feature(feature_name, _soft=False):
    """ This does a hard delete """
    await pg.fetchval(
        db.features.delete()
            .where(db.features.c.name == feature_name))

    if not _soft:
        # delete from soft deletes if needed
        await pg.fetchval(db.deleted_features.delete()
                          .where(db.deleted_features.c.name == feature_name))


async def is_feature_soft_deleted(feature_name):
    try:
        result = await pg.fetchval(
            db.deleted_features.select().where(db.deleted_features.c.name == feature_name)
        )
    except Exception as e:
        pass
    if result and len(result) > 0:
        return True
    return False


async def remove_feature(feature_name, username):
    """ This does a soft delete """
    # save it in soft deletes
    await pg.fetchval(
        db.deleted_features.insert().values(name=feature_name,
                                            deleted_on=functions.now(),
                                            deleted_by=username))

    # now delete it
    await delete_feature(feature_name, _soft=True)
