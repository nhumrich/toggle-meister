from __future__ import with_statement
from alembic import context
from sqlalchemy import engine_from_config, pool, create_engine
from logging.config import fileConfig
import os

# this is the Alembic Config object, which provides
# access to the values within the .ini file in use.
config = context.config

# Interpret the config file for Python logging.
# This line sets up loggers basically.
fileConfig(config.config_file_name)

# add your model's MetaData object here
# for 'autogenerate' support
from tmeister.dataaccess import db
target_metadata = db.METADATA

# other values from the config, defined by the needs of env.py,
# can be acquired:
# my_important_option = config.get_main_option("my_important_option")
# ... etc.


def get_database_url():
    POSTGRES_URL = os.getenv('DATABASE_URL', 'localhost')
    POSTGRES_USERNAME = os.getenv('DATABASE_MIGRATION_USER', 'postgres')
    POSTGRES_PASSWORD = os.getenv('DATABASE_MIGRATION_PASS', 'password')
    POSTGRES_DB_NAME = os.getenv('DATABASE_DB_NAME', 'postgres')

    url = 'postgres://{user}:{password}@{host}/{db}'.format(
        user=POSTGRES_USERNAME,
        password=POSTGRES_PASSWORD,
        host=POSTGRES_URL,
        db=POSTGRES_DB_NAME
    )
    return url


def run_migrations_offline():
    """Run migrations in 'offline' mode.

    This configures the context with just a URL
    and not an Engine, though an Engine is acceptable
    here as well.  By skipping the Engine creation
    we don't even need a DBAPI to be available.

    Calls to context.execute() here emit the given string to the
    script output.

    """
    url = get_database_url()
    context.configure(
        url=url, target_metadata=target_metadata, literal_binds=True)

    with context.begin_transaction():
        context.run_migrations()


def run_migrations_online():
    """Run migrations in 'online' mode.

    In this scenario we need to create an Engine
    and associate a connection with the context.

    """
    url = get_database_url()
    connectible = create_engine(
        url,
        poolclass=pool.NullPool
    )

    with connectible.connect() as connection:
        context.configure(
            connection=connection,
            target_metadata=target_metadata
        )

        with context.begin_transaction():
            context.run_migrations()


if context.is_offline_mode():
    run_migrations_offline()
else:
    run_migrations_online()
