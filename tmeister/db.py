# Data Access Layer!
import os
import asyncio
from aiopg.sa import create_engine
from sqlalchemy import Table, Column, Integer, String, Boolean, ForeignKey
from sqlalchemy.dialects.postgresql import ARRAY, TIMESTAMP
import sqlalchemy as sa
from psycopg2 import IntegrityError

metadata = sa.MetaData()

POSTGRES_URL = os.getenv('DATABASE_URL', 'localhost')
POSTGRES_USERNAME = os.getenv('DATABASE_USER', 'postgres')
POSTGRES_PASSWORD = os.getenv('DATABASE_PASS', 'password')
POSTGRES_DB_NAME = os.getenv('DATABASE_DB_NAME', 'postgres')
DEBUG = os.getenv('DEBUG', 'true').lower() == 'true'


class KeyAlreadyExistsError(Exception):
    pass


class Transaction:
    def __init__(self, context_manager):
        self._context_manager = context_manager
        self._transaction = None

    async def __aenter__(self):
        conn = await self._context_manager.__aenter__()
        self._transaction = await conn.begin()
        await self._transaction.__aenter__()
        return conn

    async def __aexit__(self, exc_type, exc_val, exc_tb):
        await self._transaction.__aexit__(exc_type, exc_val, exc_tb)
        await self._context_manager.__aexit__(exc_type, exc_val, exc_tb)


class DB:
    def __init__(self):
        self.features = Table(
            'features', metadata,
            Column('name', String(50), unique=True, primary_key=True),
            Column('prefix', String(10)),
            Column('squad_id', Integer, ForeignKey('squads.squad_id')),
            Column('created_on', TIMESTAMP),
            Column('deleted_on', TIMESTAMP)
        )
        self.environments = Table(
            'environments', metadata,
            Column('name', type_=String(40), primary_key=True, unique=True),
            Column('external', type_=Boolean, default=False),
            Column('external_url', type_=String),
            Column('external_secret', type_=String),
            Column('squad_id', Integer, ForeignKey('squads.squad_id'),
                   nullable=True),
        )
        self.toggles = Table(
            'toggles', metadata,
            Column('feature', String(50)),
            Column('env', String(40)),
            Column('state', String(5))
        )
        self.squads = Table(
            'squads', metadata,
            Column('squad_id', type_=Integer, primary_key=True),
            Column('name', type_=String(50), unique=True),
        )
        self.employees = Table(
            'employees', metadata,
            Column('employee_id', Integer, primary_key=True),
            Column('name', String()),
            Column('username', type_=String(), unique=True),
            Column('squad_id', Integer, ForeignKey('squads.squad_id')),
            Column('email', type_=String()),
            Column('role_id', Integer, ForeignKey('roles.role_id'))
        )
        self.roles = Table(
            'roles', metadata,
            Column('role_id', type_=Integer, primary_key=True),
            Column('name', type_=String()),
            Column('is_blacklist', type_=Boolean, default=True),
            Column('whitelist', type_=ARRAY(String)),
            Column('blacklist', type_=ARRAY(String)),
            Column('can_create', type_=Boolean)
        )
        self.engine = None
        # Set up engine, which we need to do asynchronously
        # Even though we are currently in a synchronous setup step right now
        loop = asyncio.get_event_loop()
        loop.run_until_complete(self._get_engine())

    def __del__(self):
        if self.engine:
            self.engine.close()
            self.engine.wait_closed()

    async def _get_engine(self):
        if not self.engine:
            self.engine = await create_engine(
                user=POSTGRES_USERNAME,
                database=POSTGRES_DB_NAME,
                host=POSTGRES_URL,
                password=POSTGRES_PASSWORD,
            )

    async def go(self, query, callback=None):
        await self._get_engine()
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

    def begin(self):
        """
        Start a transaction and get an transaction object.
        There queries hold on to connections until the entire transaction is
        complete

        To be used like
          with db.begin() as conn:
              conn.execute(query)
        """
        conn = self.engine.acquire()
        return Transaction(conn)

    async def test(self):
        import asyncpg
        await self._get_engine()
        query = self.toggles.select() \
            .where(db.toggles.c.env == 'bob2') \
            .where(db.toggles.c.feature.in_(['bobbytables', "table2' or 1=1;"]))


        pool = await asyncpg.create_pool(
            user=POSTGRES_USERNAME,
            database=POSTGRES_DB_NAME,
            host=POSTGRES_URL,
            password=POSTGRES_PASSWORD,
        )
        con = await pool.acquire()
        # async with con.transaction():
        import json
        _dialect = sa.dialects.postgresql.base.PGDialect(
            json_serializer=json.dumps,
            json_deserializer=lambda x: x)
        _dialect.implicit_returning = True
        _dialect.supports_native_enum = True
        _dialect.supports_smallserial = True  # 9.2+
        _dialect._backslash_escapes = False
        _dialect.supports_sane_multi_rowcount = True  # psycopg 2.0.9+
        _dialect._has_native_hstore = True
        _dialect = sa.dialects.postgresql.dialect()
        q = query.compile(dialect=_dialect, compile_kwargs={"literal_binds": True})
        print(q)





        result = await con.fetch(str(q))
        for r in result:
            print(r)
        print(result)

        await pool.release(con)
        async with self.begin() as conn:
            print(dir(conn))


if __name__ == '__main__':
    # test
    db = DB()

    loop = asyncio.get_event_loop()

    loop.run_until_complete(db.test())
#
