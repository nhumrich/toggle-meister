from asyncpgsa import pg

from . import db


async def add_env(env_name):
    await pg.fetchval(db.environments.insert().values(name=env_name))
    return {'name': env_name}


async def get_envs(*, env_list=None):
    query = db.environments.select()
    if env_list:
        query = query.where(db.environments.c.name.in_(env_list))

    envs = await pg.fetch(query)
    return [row['name'] for row in envs]


async def delete_env(env_name):
    await pg.fetchval(db.environments.delete()
                      .where(db.environments.c.name == env_name))

    await pg.fetchval(db.toggles.delete()
                      .where(db.toggles.c.env == env_name))
