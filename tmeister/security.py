import time
import re

import jwt
from aioauth_client import GoogleClient
from starlette.authentication import AuthenticationBackend, \
    AuthenticationError, SimpleUser, UnauthenticatedUser, AuthCredentials
from starlette.responses import PlainTextResponse, JSONResponse, RedirectResponse
from starlette.requests import Request

from . import employees


class StartAuthError(AuthenticationError):
    """ Signals that we should start authentication """


class RedirectAuthError(AuthenticationError):
    """ Signals that authentication is done and we should redirect """


def get_hostname(request):
    scheme = request.url.scheme
    if request.headers.get('X-Forwarded-Proto') == 'https' or \
            request.headers.get('X-Scheme') == 'https':
        scheme = 'https'
    return f'{scheme}://{request.url.hostname}'


class GoogleAuthBackend(AuthenticationBackend):
    allowed_patterns = [re.compile(r'^/api/envs/.*/toggles$'),
                        re.compile(r'^/api/features'),
                        re.compile(r'^/heartbeat$')]

    def __init__(self, id, secret, org):
        super().__init__()
        self.id = id
        self.secret = secret
        self.org = org

    def on_error(self, request: Request, exc: Exception):
        if isinstance(exc, StartAuthError):
            if request.url.path.startswith('/api'):
                return JSONResponse({'error': 'Unauthenticated'}, status_code=401)

            state = str(request.url)
            host = get_hostname(request)
            if request.url.port:
                host += f':{request.url.port}'
            r = RedirectResponse(f'https://accounts.google.com/o/oauth2/v2/auth?'
                                 f'client_id={self.id}&'
                                 f'response_type=code&scope=openid profile email&'
                                 f'redirect_uri={host}/oauth_callback/google'
                                 f'&state={state}&'
                                 f'hd={self.org}')
            return r
        elif isinstance(exc, RedirectAuthError):
            return RedirectResponse(request.state.redirect_url)
        else:
            return PlainTextResponse('Invalid user', status_code=403)

    async def authenticate(self, request: Request):
        if request['method'] == 'GET' and \
                any((x.match(request.url.path) for x in self.allowed_patterns)):
            return AuthCredentials(['unauthenticated']), UnauthenticatedUser()

        elif self.id is None:
            # local dev
            username = 'admin.user@sampledomain.com'
            eid = await employees.check_employee(username)
            return AuthCredentials(['authenticated']), SimpleUser(username=eid)

        elif request.url.path == '/oauth_callback/google':
            # handle redirect
            # print('sess', request.session)
            query = request.query_params
            state = query.get('state')
            code = query.get('code')

            gc = GoogleClient(client_id=self.id,
                              client_secret=self.secret)
            host = get_hostname(request)
            if request.url.port:
                host += f':{request.url.port}'
            otoken, other = await gc.get_access_token(
                code,
                redirect_uri=f'{host}/oauth_callback/google')

            idt = other['id_token']
            id_token = jwt.decode(idt, verify=False)

            email = id_token.get('email')
            if not (id_token.get('hd') == self.org == email.split('@')[1]):
                return AuthenticationError('Bad user')

            timestamp = time.time()
            eid = await employees.check_employee(email)
            request.session['ts'] = timestamp
            request.session['user'] = eid
            request.state.redirect_url = state
            raise RedirectAuthError('need to redirect')

        elif request.session and request.session.get('user'):
            # make sure cookie is still valid
            timestamp = request.session.get('ts')
            now = time.time()
            if now - timestamp > 86520:
                raise StartAuthError

            user = request.session.get('user')
            return AuthCredentials(['authenticated']), SimpleUser(username=user)
        else:
            raise StartAuthError('Not logged in')
