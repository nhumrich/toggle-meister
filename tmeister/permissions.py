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
    delete_env = 4
    create_feature = 5
    delete_feature = 6


async def check_permissions(username: str, action: Action):
    try:
        employee = await employeeda.get_employee(username)
    except Exception as e:
        print(e)
    role = Role(employee['role_id'])
    if role == Role.read_only:
        raise InsufficientPermissionsError
    if (action in (Action.create_env, Action.delete_env) and
            role != Role.admin):
        raise InsufficientPermissionsError
