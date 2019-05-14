from sqlalchemy import Table, Column, Integer, String, \
    ForeignKey, Index, text
from sqlalchemy.dialects.postgresql import TIMESTAMP, JSONB, DATE
import sqlalchemy as sa

METADATA = sa.MetaData()

features = Table(
    'features', METADATA,
    Column('name', String(50), unique=True, primary_key=True),
    Column('squad_id', Integer, ForeignKey('squads.id')),
    Column('created_on', TIMESTAMP),
    Column('created_by', ForeignKey('employees.username'))
)

deleted_features = Table(
    'deleted_features', METADATA,
    Column('name', String(50), unique=True, primary_key=True),
    Column('deleted_on', TIMESTAMP),
    Column('deleted_by', String, ForeignKey('employees.username'))
)

environments = Table(
    'environments', METADATA,
    Column('name', type_=String(40), primary_key=True, unique=True),
    Column('squad_id', Integer, ForeignKey('squads.id'),
           nullable=True),
)

toggles = Table(
    'toggles', METADATA,
    Column('feature', String),
    Column('env', String, ForeignKey('environments.name')),
    Column('state', String(5)),
    Column('date_on', TIMESTAMP),
)
Index('on_togs', toggles.c.feature, toggles.c.env, unique=True)

auditing = Table(
    'auditing', METADATA,
    Column('id', Integer, autoincrement=True, primary_key=True),
    Column('event', String(50), index=True, nullable=False),
    Column('user', String, nullable=True),
    Column('date', TIMESTAMP),
    Column('event_data', JSONB, nullable=True)
)

squads = Table(
    'squads', METADATA,
    Column('id', type_=Integer, primary_key=True, autoincrement=True),
    Column('name', type_=String(50), unique=True),
)

employees = Table(
    'employees', METADATA,
    Column('username', type_=String(), primary_key=True, unique=True),
    Column('name', String),
    Column('squad_id', Integer, ForeignKey('squads.id')),
    Column('email', type_=String),
    Column('role_id', Integer)
)

metrics = Table(
    'metrics', METADATA,
    Column('feature', String, index=True, nullable=False),
    Column('env', String, index=True, nullable=False),
    Column('date', DATE, nullable=False),
    Column('hit_count', Integer, nullable=False, server_default=text('1')),
)
Index('metrics_index', metrics.c.feature, metrics.c.env, metrics.c.date, unique=True)
