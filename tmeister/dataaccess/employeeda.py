from asyncpgsa import pg
import sqlalchemy as sa
from . import db


async def get_employee(username):
    query = db.employees.select().where(db.employees.c.username == username)
    employee = await pg.fetchrow(query)
    return employee


async def get_employee_usernames(employee_list=None):
    results = await get_employees(employee_list=employee_list)
    return [r['username'] for r in results]


async def get_employees(employee_list=None):
    query = db.employees.select()
    if employee_list:
        query = query.where(db.employees.c.username.in_(employee_list))

    results = await pg.fetch(query)
    return [{'username': r['username'],
             'name': r['name'],
             'email': r['email'],
             'role': r['role_id']} for r in results]


async def add_employee(username: str, *,
                       email: str = None, name: str = None,
                       squad_id: int = None, role_id: int = None):
    query = db.employees.insert()\
        .values(username=username, name=name, squad_id=squad_id,
                email=email, role_id=role_id)

    employee_id = await pg.fetchval(query)
    return employee_id


async def modify_employee(username, role=None, name=None):
    values = {}
    if role:
        values['role_id'] = role
    if name:
        values['name'] = name

    update = db.employees.update().values(**values).where(db.employees.c.username == username)
    result = await pg.fetchrow(update)
    return {'username': result['username'],
            'name': result['name'],
            'email': result['email'],
            'role': result['role_id']}
