from starlette.requests import Request
from starlette.responses import JSONResponse

from .dataaccess import employeeda
from .permissions import Role


async def get_employees(request: Request):
    employees = await employeeda.get_employees()
    for e in employees:
        e['role'] = Role(e['role']).name

    return JSONResponse({'employees': employees})


async def edit_employee(request: Request):
    username = request.path_params.get('username')
    current_user, modified_user = await employeeda.get_employees(
        [request.user.display_name, username])

    body = await request.json()
    updates = {}

    if 'username' in body and body['username'] != modified_user:
        return JSONResponse({'Message': 'Cannot edit username'}, status_code=400)

    if 'name' in body and body['name'] != modified_user['name']:
        if current_user['username'] == modified_user['username']:
            # updating self
            updates['name'] = body['name']
        elif current_user['role'] != 1:
            return JSONResponse({'Message': 'Cannot edit other users'}, status_code=403)

    if 'email' in body and body['email'] != modified_user['email']:
        if current_user['username'] == modified_user['username']:
            # updating self
            updates['email'] = body['email']
        elif current_user['role'] != 1:
            return JSONResponse({'Message': 'Cannot edit other users'}, status_code=403)

    if 'role' in body and body['role'] != Role(modified_user['role']).name:
        # changing role
        new_role = Role[body['role']]
        if modified_user['role'] > current_user['role'] and new_role.value >= current_user['role']:
            # only allowed if a lesser role going to an equal or lesser role
            updates['role'] = new_role.value
        else:
            return JSONResponse({'Message': 'Cannot modify someone of '
                                            'greater permissions than yourself'}, status_code=403)

    result = await employeeda.modify_employee(username, **updates)
    return JSONResponse(result)


async def check_employee(user: str):
    """ Check that the user exists """
    email = user
    username, _ = user.split('@')
    name = username.replace('.', ' ').title()
    exists = await employeeda.get_employee_usernames((username,))
    if exists:
        return username

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
    return username
