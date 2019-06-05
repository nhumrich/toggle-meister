from asyncpgsa import pg
from sqlalchemy.sql import functions

from . import db


async def get_release_notes():
    query = db.release_notes.select()

    results = await pg.fetch(query)

    return [{'id': row['id'], 'title': row['title'], 'body': row['body'],
             'feature': row['feature'], 'date': row['created_date']}
            for row in results]


async def create_release_note(title, body=None, feature=None):
    insert = db.release_notes.insert().values(title=title, body=body,
                                              feature=feature, created_date=functions.now())
    result = await pg.fetchval(insert)
    return result


async def delete_release_note(release_note_id):
    delete = db.release_notes.delete().where(db.release_notes.c.id == release_note_id)
    await pg.fetchval(delete)


async def remove_references_to_feature(feature):
    update = db.release_notes.update().values(feature=None)\
        .where(db.release_notes.c.feature == feature)
    await pg.fetchval(update)


async def update_release_note(release_note_id, title=None, body=None, feature=None):
    update = db.release_notes.update()
    kwargs = {}
    if title:
        kwargs['title'] = title
    if body:
        kwargs['body'] = body
    if feature:
        kwargs['feature'] = feature
    update = update.values(**kwargs)

    update = update.where(db.release_notes.c.id == release_note_id)

    await pg.fetchval(update)
