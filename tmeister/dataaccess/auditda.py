import json

from asyncpgsa import pg

from . import db


async def audit_event(event, user, event_data, date):
    await pg.fetchval(db.auditing.insert().values(
        event=event,
        user=user,
        date=date,
        event_data=event_data)
    )

async def get_recent_audits():
    query = db.auditing.select().order_by(db.auditing.c.date.desc()).limit(50)
    results = await pg.fetch(query)
    return [
        {'event': row.event,
         'user': row.user,
         'date': row.date,
         'event_data': json.loads(row.event_data),
         }
        for row in results
        ]
