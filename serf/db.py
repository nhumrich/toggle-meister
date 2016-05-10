# Data Access Layer!
import os
import asyncio
from aiopg.sa import create_engine
from sqlalchemy import Table, Column, Integer, String, Boolean
import sqlalchemy as sa
from psycopg2 import IntegrityError
metadata = sa.MetaData()


POSTGRES_URL = os.getenv('DATABASE_URL', 'localhost')
POSTGRES_USERNAME = os.getenv('DATABASE_USER', 'postgres')
POSTGRES_PASSWORD = os.getenv('DATABASE_PASS', 'password')
POSTGRES_DB_NAME = os.getenv('DATABASE_DB_NAME', 'postgres')
DEBUG = os.getenv('DEBUG', 'true').lower() == 'true'

'''
dsn = 'dbname=aiopg user=aiopg password'
engine = create_engine('postgres://{POSTGRES_USERNAME}:{POSTGRES_PASSWORD}@{POSTGRES_URL}/{POSTGRES_DB_NAME}'
                       .format(**locals()),
                       echo=DEBUG,
                       pool_size=2,
                       )
'''


class KeyAlreadyExistsError(Exception):
    pass


class DB:

    def __init__(self):
        self.features = Table('features', metadata,
                             Column('name', type_=String(50), unique=True),
                             Column('prefix', type_=String(10)),
                             )
        self.environments = Table('environments', metadata,
                                  Column('name', type_=String(40)),
                                  )
        self.toggles = Table('toggles', metadata,
                              Column('feature', String(50)),
                              Column('env', String(40)),
                              Column('state', String(5))
                              )
        self.engine = None

    def __del__(self):
        if self.engine:
            self.engine.close()
            while not self.engine.closed:
                pass

    async def go(self, query, callback=None):
        if not self.engine:
            self.engine = await create_engine(
                user=POSTGRES_USERNAME,
                database=POSTGRES_DB_NAME,
                host=POSTGRES_URL,
                password=POSTGRES_PASSWORD,
            )

        try:
            async with self.engine.acquire() as conn:
                results = await conn.execute(query)
                if callback is None:
                    return results
                elif hasattr(callback, '__call__'):
                    return await callback(results)
                else:
                    raise Exception('Callback must be of callable type')
        except IntegrityError as e:
            if e.pgcode == '23505':  # Unique key violation (duplicate key)
                raise KeyAlreadyExistsError('Key already exists')


async def seed():
    envs = await db.go(db.environments.select())
    if envs.rowcount == 0:
        # empty database, time to seed
        await db.go(db.environments.insert().values(name='Production'))
        await db.go(db.environments.insert().values(name='dev'))
        print('seed complete')
    else:
        print('seeding not needed')


async def test_connection():
    async def get_features(features):
        if features.rowcount == 0:
            await db.go(db.features.insert().values(name='my_feature', prefix='my_'))
        else:
            for row in features:
                print(row.name, row.prefix)

    await db.go(db.features.select(), get_features)

    async def get_envs(envs):
        for row in envs:
            print(row.name)

    await db.go(db.environments.select(), get_envs)


if __name__ == '__main__':
    # test
    db = DB()

    loop = asyncio.get_event_loop()
    loop.run_until_complete(seed())

    loop.run_until_complete(test_connection())
#
