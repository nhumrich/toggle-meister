
from datetime import datetime
import json

from aiohttp import web

from . import dataaccess


async def audit_event(event, user, event_data, date=None):
    if date is None:
        date = datetime.now()
    if isinstance(event_data, dict):
        event_data = json.dumps(event_data)
    await dataaccess.audit_event(event, user, event_data, date)


async def get_audit_events(request):
    results = await dataaccess.get_recent_audits()
    for row in results:
        row['date'] = row['date'].isoformat()

    return web.json_response(results)
