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
import sqlalchemy as sa
from sqlalchemy.sql import table, column


def upgrade():
    op.create_table(
        'features',
        sa.Column('name', type_=sa.String(50), unique=True),
        sa.Column('prefix', type_=sa.String(10)),
    )
    op.create_index('feat_name', 'features', ['name'], unique=True)

    op.create_table(
        'environments',
        sa.Column('name', type_=sa.String(40)),
    )
    op.create_index('env_name', 'environments', ['name'], unique=True)

    op.create_table(
        'toggles',
        sa.Column('feature', sa.String(50)),
        sa.Column('env', sa.String(40)),
        sa.Column('state', sa.String(5)),
    )
    op.create_index('on_togs', 'toggles', ['feature', 'env'], unique=True)

    envs_table = table('environments',
                       column('name', sa.String(50)))

    # Seed with production env
    op.bulk_insert(
        envs_table,
        [
            {'name': 'Production'}
        ]
    )


def downgrade():
    op.drop_table('features')
    op.drop_table('environments')
    op.drop_table('toggles')
