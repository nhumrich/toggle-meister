from aiohttp import web
from asyncpgsa import pg


async def get_health(request: web.Request) -> web.Response:
    try:
        await pg.fetch('SELECT 42')

    except Exception as e:
        # Just making sure we can get a successful connection/query
        # if we cant, we are not healthy
        request.app.raven.captureException(
            extra={'health_check': True},
            level='warning')
        return web.HTTPServiceUnavailable(reason='cant access db')

    return web.Response(text="All is well")
