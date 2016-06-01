from aioauth_client import GithubClient
from aiohttp import web
from aiohttp_session.cookie_storage import EncryptedCookieStorage

github = GithubClient(
    client_id='b6281b6fe88fa4c313e6',
    client_secret='21ff23d9f1cad775daee6a38d230e1ee05b04f7c',
)


async def authorize(request):
    authorize_url = github.get_authorize_url(scope="user:email")
    raise web.HTTPTemporaryRedirect(authorize_url)


async def is_authorized(request):
    pass


async def handle_github_auth(request):
    pass