"""lower case production

Revision ID: fa2cd0ecc30f
Revises: 1693a9b29733
Create Date: 2019-04-23 10:01:13.744020

"""

# revision identifiers, used by Alembic.
revision = 'fa2cd0ecc30f'
down_revision = '1693a9b29733'
branch_labels = None
depends_on = None

from alembic import op
import sqlalchemy as sa


def upgrade():
    bind = op.get_bind()
    bind.execute("""
        ALTER TABLE toggles ALTER CONSTRAINT toggles_env_fkey DEFERRABLE;
        BEGIN;
        SET CONSTRAINTS toggles_env_fkey DEFERRED;
        UPDATE toggles SET env='production' where env='Production';
        UPDATE environments set name='production' where name='Production';
        COMMIT;
    """)


def downgrade():
    bind = op.get_bind()
    bind.execute("""
            BEGIN;
            SET CONSTRAINTS toggles_env_fkey DEFERRED;
            ALTER TABLE toggles disable TRIGGER ALL;
            UPDATE toggles SET env='Production' where env='production';
            UPDATE environments set name='Production' where name='production';
            COMMIT; 
        """)
