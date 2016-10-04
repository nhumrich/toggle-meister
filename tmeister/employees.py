

from .dataaccess import employeeda
from .permissions import Role


async def get_employees(request):
    pass


async def check_employee(user: dict):
    """ Check that the user exists """
    username = user.get('username')
    exists = await employeeda.get_employee_usernames((username,))
    if exists:
        return

    email = user.get('email')
    name = user.get('name')
    usernames = await employeeda.get_employee_usernames()
    if not usernames:
        # No users yet, this user gets to be an admin!
        role = Role.admin
    else:
        role = Role.dev

    await employeeda.add_employee(
        username,
        role_id=role.value,
        name=name,
        email=email)
