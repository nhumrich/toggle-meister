from aiohttp import web


async def security_middleware(app, handler):
    async def middleware_handler(request: web.Request):
        response = await handler(request)
        response.headers['Server'] = 'toggle-meister'
        return response
    return middleware_handler
