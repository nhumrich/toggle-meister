from sqlalchemy import Table, Column, Integer, String, \
    Boolean, ForeignKey
from sqlalchemy.dialects.postgresql import ARRAY, TIMESTAMP, JSONB
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
    Column('event', String(50), index=True),
    Column('user', String),
    Column('date', TIMESTAMP),
    Column('event_data', JSONB)
)

squads = Table(
    'squads', METADATA,
    Column('squad_id', type_=Integer, primary_key=True),
    Column('name', type_=String(50), unique=True),
)

employees = Table(
    'employees', METADATA,
    Column('employee_id', Integer, primary_key=True),
    Column('name', String()),
    Column('username', type_=String(), unique=True),
    Column('squad_id', Integer, ForeignKey('squads.squad_id')),
    Column('email', type_=String()),
    Column('role_id', Integer, ForeignKey('roles.role_id'))
)

roles = Table(
    'roles', METADATA,
    Column('role_id', type_=Integer, primary_key=True),
    Column('name', type_=String()),
    Column('is_blacklist', type_=Boolean, default=True),
    Column('whitelist', type_=ARRAY(String)),
    Column('blacklist', type_=ARRAY(String)),
    Column('can_create', type_=Boolean)
)
