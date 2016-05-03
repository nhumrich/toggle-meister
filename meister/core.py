from aiohttp import web


async def handle(request):
    data = {'hello': 'world'}
    return web.json_response(data)

app = web.Application()
app.router.add_route('GET', '/handle', handle)

web.run_app(app, port=8444)


''' ToDos:
* Worker backend that handles doing automatic things
    * Checking for out-of-date toggles
    * Slack blaming
    * Marking toggle as deleted
    * Submitting pull-request for toggle
* Server rendered webpage
    (dont want endpoints for these for security and to force all users to go through ui)
    * Create environments
        * there should always be a special "dev" and "prod" environment
    * Create Toggles
        * Toggles should be created on every environment defaulted to "false"
    * Remove toggles
    * Turning toggles on
        * Turning on should push the serf to reload whats in memory
* Gihub auth
'''
