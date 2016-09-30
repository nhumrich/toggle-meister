
from datetime import datetime
import json

from aiohttp import web

from .dataaccess import auditda


async def audit_event(event, user, event_data, date=None):
    if date is None:
        date = datetime.now()
    if isinstance(event_data, dict):
        event_data = json.dumps(event_data)
    await auditda.audit_event(event, user, event_data, date)


async def get_audit_events(request):
    results = await auditda.get_recent_audits()
    for row in results:
        row['date'] = row['date'].isoformat()

    return web.json_response(results)
