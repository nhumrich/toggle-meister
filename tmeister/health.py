# from aiohttp import web
from starlette import responses
from asyncpgsa import pg


async def get_health(request):
    try:
        await pg.fetch('SELECT 42')

    except Exception as e:
        # Just making sure we can get a successful connection/query
        # if we cant, we are not healthy
        request.app.raven.captureException(
            extra={'health_check': True},
            level='warning')
        return responses.PlainTextResponse('cant access db', status_code=503)
        # return web.HTTPServiceUnavailable(reason='cant access db')

    return responses.PlainTextResponse("All is well")
