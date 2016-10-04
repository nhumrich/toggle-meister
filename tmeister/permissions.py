from enum import Enum

from .dataaccess import employeeda


class InsufficientPermissionsError(Exception):
    """ User does not have correct permissions """


class Role(Enum):
    admin = 1
    qa = 2
    dev = 3
    read_only = 4


class Action(Enum):
    toggle_prod = 1
    toggle = 2
    create_env = 3
    create_feature = 4


async def check_permissions(username: str, action: Action):
    employee = await employeeda.get_employee(username)
    role = Role(employee.role_id)
    if role == Role.read_only:
        raise InsufficientPermissionsError
    if (action == Action.toggle_prod and
            role not in (Role.admin, Role.qa)):
        raise InsufficientPermissionsError
    if (action == Action.create_env and
            role != Role.admin):
        raise InsufficientPermissionsError


async def check_toggle_permissions(username: str, environment: str):
    if environment == 'Production':
        await check_permissions(username, Action.toggle_prod)
    else:
        await check_permissions(username, Action.toggle)
