from asyncpgsa import pg
import sqlalchemy as sa
from . import db


async def get_employee(username):
    query = db.employees.select().where(db.employees.c.username == username)
    employee = await pg.fetchrow(query)
    return employee


async def get_employee_usernames(employee_list=None):
    query = sa.select([db.employees.c.username])
    if employee_list:
        query = query.where(db.employees.c.username.in_(employee_list))

    results = await pg.fetch(query)

    return [r.username for r in results]


async def add_employee(username: str, *,
                       email: str = None, name: str = None,
                       squad_id: int = None, role_id: int = None):
    query = db.employees.insert()\
        .values(username=username, name=name, squad_id=squad_id,
                email=email, role_id=role_id)

    employee_id = await pg.fetchval(query)
    return employee_id