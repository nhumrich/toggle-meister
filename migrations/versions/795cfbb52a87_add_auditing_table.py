"""add_auditing_table

Revision ID: 795cfbb52a87
Revises: 21b664b587ce
Create Date: 2016-09-28 11:16:19.642493

"""

# revision identifiers, used by Alembic.
revision = '795cfbb52a87'
down_revision = '21b664b587ce'
branch_labels = None
depends_on = None

from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql


def upgrade():
    op.create_table(
        'auditing',
        sa.Column('id', sa.Integer, autoincrement=True, primary_key=True),
        sa.Column('event', sa.String(length=50), nullable=False),
        sa.Column('user', sa.String(), nullable=True),
        sa.Column('date', postgresql.TIMESTAMP()),
        sa.Column('event_data', postgresql.JSONB(), nullable=True)
    )


def downgrade():
    op.drop_table('auditing')
