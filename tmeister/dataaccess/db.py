from sqlalchemy import Table, Column, Integer, String, \
    ForeignKey
from sqlalchemy.dialects.postgresql import TIMESTAMP, JSONB
import sqlalchemy as sa

METADATA = sa.MetaData()

features = Table(
    'features', METADATA,
    Column('name', String(50), unique=True, primary_key=True),
    Column('prefix', String(10)),
    Column('squad_id', Integer, ForeignKey('squads.squad_id')),
    Column('created_on', TIMESTAMP),
    Column('deleted_on', TIMESTAMP),
)

environments = Table(
    'environments', METADATA,
    Column('name', type_=String(40), primary_key=True, unique=True),
    Column('squad_id', Integer, ForeignKey('squads.squad_id'),
           nullable=True),
)

toggles = Table(
    'toggles', METADATA,
    Column('feature', String, ForeignKey('features.name')),
    Column('env', String, ForeignKey('environments.name')),
    Column('state', String(5)),
)

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
    Column('squad_id', type_=Integer, primary_key=True, autoincrement=True),
    Column('name', type_=String(50), unique=True),
)

employees = Table(
    'employees', METADATA,
    Column('username', type_=String(), primary_key=True, unique=True),
    Column('name', String),
    Column('squad_id', Integer, ForeignKey('squads.squad_id')),
    Column('email', type_=String),
    Column('role_id', Integer)
)
