
from datetime import datetime

from starlette.responses import UJSONResponse

from .dataaccess import auditda


async def audit_event(event, user, event_data, date=None):
    if date is None:
        date = datetime.now()
    if isinstance(event_data, dict):
        event_data = event_data
    await auditda.audit_event(event, user, event_data, date)


async def get_audit_events(request):
    results = await auditda.get_recent_audits()
    for row in results:
        row['date'] = row['date'].isoformat()

    return UJSONResponse(results)
