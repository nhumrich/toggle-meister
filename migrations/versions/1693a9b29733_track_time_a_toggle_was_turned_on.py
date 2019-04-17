"""track time a toggle was turned on

Revision ID: 1693a9b29733
Revises: 21b664b587ce
Create Date: 2019-04-16 14:24:39.318421

"""

# revision identifiers, used by Alembic.
revision = '1693a9b29733'
down_revision = '21b664b587ce'
branch_labels = None
depends_on = None

from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql


def upgrade():
    op.create_unique_constraint('employee_username', 'employees', ['username'])
    op.create_unique_constraint('env_names', 'environments', ['name'])
    op.create_unique_constraint('feature_name', 'features', ['name'])
    op.add_column('toggles', sa.Column('date_on', postgresql.TIMESTAMP(), nullable=True))
    op.add_column('features', sa.Column('created_by', sa.String(), nullable=True))
    op.create_foreign_key('feature_employee', 'features', 'employees',
                          ['created_by'], ['username'])
    op.drop_column('features', 'prefix')
    op.drop_column('features', 'deleted_on')

    # now backfill the date_on by using audit data
    bind = op.get_bind()
    all_toggles = {feature[0] for feature in bind.execute("SELECT feature FROM toggles WHERE env = 'Production';")}

    event_data = bind.execute("""
        select DISTINCT on (event_data->>'toggle_feature')
            event_data->>'toggle_feature' as name, date 
        FROM auditing WHERE event = 'toggle.switch' and 
            event_data ->> 'toggle_env' = 'Production' and 
            event_data ->> 'new_state' = 'ON' 
        order by name, date;""")

    for event in event_data:
        if event[0] in all_toggles:
            name, date = event[0], event[1]
            # print(event[0], event[1])
            bind.execute(f"UPDATE toggles set date_on = '{date}' "
                         f"where feature = '{name}' and env = 'Production';")

    features = {feature[0] for feature in bind.execute("SELECT name FROM features;")}
    feature_event_data = bind.execute("""
        select event_data->>'feature_name' as name, date, auditing.user 
        FROM auditing WHERE event = 'feature.add';""")

    for name, date, user in feature_event_data:
        if name in features:
            # print(name, date, user)
            bind.execute(f"UPDATE features set (created_on, created_by) = ('{date}', "
                         f"'{user}') where name = '{name}';")


def downgrade():
    op.add_column('features', sa.Column('deleted_on', postgresql.TIMESTAMP(), autoincrement=False, nullable=True))
    op.add_column('features', sa.Column('prefix', sa.VARCHAR(length=10), autoincrement=False, nullable=True))
    op.drop_constraint('feature_employee', 'features', type_='foreignkey')
    op.drop_column('features', 'created_by')
    op.drop_column('toggles', 'date_on')
    op.drop_constraint('feature_name', 'features', type_='unique')
    op.drop_constraint('env_names', 'environments', type_='unique')
    op.drop_constraint('employee_username', 'employees', type_='unique')
