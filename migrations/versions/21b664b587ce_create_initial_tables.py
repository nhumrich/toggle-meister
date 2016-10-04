"""Create initial tables

Revision ID: 21b664b587ce
Revises: 
Create Date: 2016-04-13 11:14:23.063513

"""

# revision identifiers, used by Alembic.
revision = '21b664b587ce'
down_revision = None
branch_labels = None
depends_on = None

from alembic import op
from sqlalchemy import Column, String, Integer, ForeignKey
from sqlalchemy.dialects.postgresql import TIMESTAMP, JSONB


def upgrade():
    # First migration. Set up all tables.

    # squads
    op.create_table(
        'squads',
        Column('id', type_=Integer, primary_key=True, autoincrement=True),
        Column('name', type_=String(50), unique=True)
    )

    # features
    op.create_table(
        'features',
        Column('name', String(50), unique=True, primary_key=True),
        Column('prefix', String(10)),
        Column('squad_id', Integer, ForeignKey('squads.id')),
        Column('created_on', TIMESTAMP),
        Column('deleted_on', TIMESTAMP)
    )

    # environments
    envs_table = op.create_table(
        'environments',
        Column('name', type_=String(40), primary_key=True, unique=True),
        Column('squad_id', Integer, ForeignKey('squads.id'),
               nullable=True),

    )

    # toggles
    op.create_table(
        'toggles',
        Column('feature', String, ForeignKey('features.name')),
        Column('env', String, ForeignKey('environments.name')),
        Column('state', String(5)),
    )
    op.create_index('on_togs', 'toggles', ['feature', 'env'], unique=True)

    # employees
    op.create_table(
        'employees',
        Column('username', type_=String(25), unique=True, primary_key=True),
        Column('name', String),
        Column('squad_id', Integer, ForeignKey('squads.id')),
        Column('email', type_=String),
        Column('role_id', Integer)
    )

    # auditing
    op.create_table(
        'auditing',
        Column('id', Integer, autoincrement=True, primary_key=True),
        Column('event', String(length=50), nullable=False, index=True),
        Column('user', String(), nullable=True),
        Column('date', TIMESTAMP),
        Column('event_data', JSONB, nullable=True)
    )

    # Seed
    op.bulk_insert(
        envs_table,
        [
            {'name': 'Production'},
            # just a place holder so nobody tries to create this environment
            {'name': 'dev'}
        ]
    )


def downgrade():
    op.drop_table('employees')
    op.drop_table('toggles')
    op.drop_table('features')
    op.drop_table('environments')
    op.drop_table('squads')
    op.drop_table('auditing')
