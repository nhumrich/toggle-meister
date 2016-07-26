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
from sqlalchemy import Column, String, Integer, Boolean, ForeignKey
from sqlalchemy.dialects.postgresql import ARRAY, TIMESTAMP


def upgrade():
    # First migration. Set up all tables.

    # squads
    op.create_table(
        'squads',
        Column('squad_id', type_=Integer, primary_key=True),
        Column('name', type_=String(50), unique=True)
    )

    # features
    op.create_table(
        'features',
        Column('name', String(50), unique=True, primary_key=True),
        Column('prefix', String(10)),
        Column('squad_id', Integer, ForeignKey('squads.squad_id')),
        Column('created_on', TIMESTAMP),
        Column('deleted_on', TIMESTAMP)
    )
    # op.create_index('feat_name', 'features', ['name'], unique=True)

    # environments
    envs_table = op.create_table(
        'environments',
        Column('name', type_=String(40), primary_key=True, unique=True),
        Column('squad_id', Integer, ForeignKey('squads.squad_id'),
               nullable=True),

    )
    # op.create_index('env_name', 'environments', ['name'], unique=True)

    # toggles
    op.create_table(
        'toggles',
        Column('feature', String, ForeignKey('features.name')),
        Column('env', String, ForeignKey('environments.name')),
        Column('state', String(5)),
    )
    op.create_index('on_togs', 'toggles', ['feature', 'env'], unique=True)

    # roles
    roles_table = op.create_table(
        'roles',
        Column('role_id', type_=Integer, primary_key=True),
        Column('name', type_=String()),
        Column('is_blacklist', type_=Boolean, default=True),
        Column('whitelist', type_=ARRAY(String)),
        Column('blacklist', type_=ARRAY(String)),
        Column('can_create', type_=Boolean)
    )

    # employees
    op.create_table(
        'employees',
        Column('employee_id', Integer, primary_key=True),
        Column('name', String()),
        Column('username', type_=String(), unique=True),
        Column('squad_id', Integer, ForeignKey('squads.squad_id')),
        Column('email', type_=String()),
        Column('role_id', Integer, ForeignKey('roles.role_id'))
    )

    # Seed
    op.bulk_insert(
        roles_table,
        [
            {'name': 'admin', 'can_create': True}
        ]
    )
    op.bulk_insert(
        envs_table,
        [
            {'name': 'Production'},
            # just a place holder so nobody tries to create this environment
            {'name': 'dev'}
        ]
    )


def downgrade():
    op.drop_table('features')
    op.drop_table('environments')
    op.drop_table('toggles')
