import time
import os
import json
from datetime import datetime

import sqlalchemy
from sqlalchemy.sql import functions
import schedule
import requests

from .dataaccess import db


SLACK_WEBHOOK_URL = os.getenv('SLACK_WEBHOOK_URL')
SLACK_CHANNEL = os.getenv('SLACK_CHANNEL')
SLACK_USERNAME = os.getenv('SLACK_USERNAME')
SLACK_REMINDER_DAY = os.getenv('SLACK_REMINDER_DAY', 'wednesday')
SLACK_REMINDER_TIME = os.getenv('SLACK_REMINDER_TIME', '16:00')
ICON_URL = os.getenv('SLACK_ICON_URL')


DISTRIBUTION = [1, 2, 3, 5, 8, 11, 14, 17, 20, 23, 26, 30, 35,
                40, 45, 50, 55, 61, 67, 73, 79, 86, 93, 100]


def get_database_url():
    POSTGRES_URL = os.getenv('DATABASE_URL', 'localhost')
    POSTGRES_USERNAME = os.getenv('DATABASE_USER', 'postgres')
    POSTGRES_PASSWORD = os.getenv('DATABASE_PASS', 'password')
    POSTGRES_DB_NAME = os.getenv('DATABASE_DB_NAME', 'postgres')

    url = 'postgres://{user}:{password}@{host}/{db}'.format(
        user=POSTGRES_USERNAME,
        password=POSTGRES_PASSWORD,
        host=POSTGRES_URL,
        db=POSTGRES_DB_NAME
    )
    return url


def get_production_toggles():
    pg = sqlalchemy.create_engine(get_database_url())
    toggles = pg.execute("SELECT feature, date_on FROM toggles "
                         "WHERE lower(env) = 'production' and state = 'ON' and "
                         "DATE_PART('day', now() - date_on) > 14")

    features = []
    for feature, date_on in toggles:
        try:
            _, user = next(pg.execute(f"SELECT name, created_by FROM features WHERE name = '{feature}';"))
            features.append((feature, user, date_on))
        except StopIteration:
            pass

    return features


def delete_removed_features():
    pg = sqlalchemy.create_engine(get_database_url())

    features = [(f['name'], f['deleted_by'], f['deleted_on']) for f in pg.execute(
        "SELECT name, deleted_by, deleted_on from deleted_features "
        "WHERE DATE_PART('day', now() - date_on) > 14")]

    for feature, user, date in features:
        # first, turn off all toggles (this cleans up the toggle db)
        envs = [result['name'] for result in pg.execute("SELECT name from environments;")]
        for e in envs:
            pg.execute(f"DELETE FROM toggles where feature='{feature}' and env='{e}';")

        # now delete the feature
        pg.execute(db.features.delete().where(db.features.c.name == feature))

        # mark the event
        pg.execute(db.auditing.insert().values(
            event='feature.remove',
            user='cron.user',
            date=datetime.now(),
            event_data={'feature_name': feature}))


def progress_rolled_toggles():
    pg = sqlalchemy.create_engine(get_database_url())

    envs = [r['name'] for r in pg.execute(db.environments.select())]
    for env in envs:
        rolling_toggles = pg.execute(db.toggles.select()
                                     .where(db.toggles.c.env == env)
                                     .where(db.toggles.c.state == 'ROLL'))

        for row in rolling_toggles:
            feature = row['feature']
            env = row['env']
            schedule = row['schedule']
            total_hours = schedule.get('total_hours')
            # current_percent = schedule.get('current_percent')
            current_hour = schedule.get('hours_count')

            hour_diff = int(total_hours / 24)
            new_hour = current_hour + 1
            if new_hour % hour_diff != 0:
                # increment hour, no other changes
                update = {'hours_count': new_hour}
                pg.execute(db.toggles.update().values(
                    schedule=sqlalchemy.text(f"schedule || '{json.dumps(update)}'"))
                           .where(db.toggles.c.env == env)
                           .where(db.toggles.c.feature == feature))
                continue

            new_percent = DISTRIBUTION[int(new_hour / hour_diff) - 1]

            if new_percent == 100:
                # turn toggle on
                with pg.begin() as conn:
                    # delete toggle
                    conn.execute(
                        db.toggles.delete()
                        .where(db.toggles.c.feature == feature)
                        .where(db.toggles.c.env == env))

                    # turn on
                    conn.execute(
                        db.toggles.insert().values(feature=feature, env=env, state='ON',
                                                   date_on=functions.now(),
                                                   schedule={'dirty': True})
                    )
                continue

            num_user_on = next(pg.execute(f"SELECT count(1) FROM rollout_users "
                                          f"WHERE env='{env}' and "
                                          f"features->>'{feature}' = 'true'"))['count']
            num_users_off = next(pg.execute(f"SELECT count(1) FROM rollout_users "
                                            f"WHERE env='{env}' and "
                                            f"features->>'{feature}' = 'false'"))['count']
            if num_users_off + num_user_on == 0:
                new_increment = new_percent
            else:
                real_current_percent = int((num_user_on / (num_user_on + num_users_off)) * 100)
                new_increment = new_percent - real_current_percent

            # now put this data back in the db
            new_schedule = {'increment': new_increment,
                            'hours_count': new_hour,
                            'current_percent': new_percent}
            query = db.toggles.update().values(
                schedule=sqlalchemy.text(f"schedule || '{json.dumps(new_schedule)}'"))\
                .where(db.toggles.c.feature == feature)\
                .where(db.toggles.c.env == env)
            pg.execute(query)

    # progress "paused" features
    for env in envs:
        paused_toggles = pg.execute(db.toggles.select()
                                    .where(db.toggles.c.env == env)
                                    .where(db.toggles.c.state == 'PAUSE'))

        for row in paused_toggles:
            feature = row['feature']
            env = row['env']
            schedule = row['schedule']
            total_hours = schedule.get('total_hours')
            current_hour = schedule.get('hours_count')
            rolling_state = schedule.get('rolling_state')

            new_hour = current_hour + 1
            update = {'hours_count': new_hour}
            if new_hour >= total_hours:
                # return to normal
                with pg.begin() as conn:
                    # delete toggle
                    conn.execute(
                        db.toggles.delete()
                        .where(db.toggles.c.feature == feature)
                        .where(db.toggles.c.env == env))

                    # back to rolling
                    conn.execute(
                        db.toggles.insert().values(feature=feature, env=env, state='ROLL',
                                                   date_on=functions.now(),
                                                   schedule=rolling_state)
                    )
            else:
                # increment hour counter
                pg.execute(db.toggles.update().values(
                    schedule=sqlalchemy.text(f"schedule || '{json.dumps(update)}'"))
                           .where(db.toggles.c.env == env)
                           .where(db.toggles.c.feature == feature))

    # clean up on toggles
    dirty_toggles = pg.execute("SELECT * FROM toggles WHERE schedule->>'dirty'='true';")
    for row in dirty_toggles:
        feature = row['feature']
        env = row['env']
        pg.execute(db.rollout_users.update()
                   .where(db.rollout_users.c.env == env)
                   .values(features=sqlalchemy.sql.text(f"features - '{feature}'")))
        pg.execute(db.toggles.update()
                   .where(db.toggles.c.feature == feature)
                   .where(db.toggles.c.env == env)
                   .values(schedule={}))

    # find ON toggles without empty schedules


def report_to_slack():
    toggs = get_production_toggles()
    for feature, user, date in toggs:
        message = f'Feature {feature} created by {user} has been on production since {date}. ' \
            f'Time to clean that up.'
        if SLACK_WEBHOOK_URL:
            slack_message = {
                'text': message
            }
            if SLACK_CHANNEL:
                slack_message['channel'] = SLACK_CHANNEL
            if SLACK_USERNAME:
                slack_message['username'] = SLACK_USERNAME
            if ICON_URL:
                slack_message['icon_url'] = ICON_URL
            try:
                req = requests.post(SLACK_WEBHOOK_URL, json=slack_message)
                if req.status_code in (200, 201, 202, 204):
                    print('successfully sent slack notification')
                else:
                    print('received error code {} with response: {}'
                          .format(req.status_code, req.text))
            except (ConnectionError, requests.HTTPError) as e:
                print('Sending logs to slack failed: {}'
                      .format(e))
            except Exception as e:
                print('Something crazy happened sending logs to slack: {}'
                      .format(e))
        else:
            print(message)


def run():
    # schedule slack shaming
    s1 = schedule.every(1).week
    s1.start_day = SLACK_REMINDER_DAY
    s1.at(SLACK_REMINDER_TIME).do(report_to_slack)

    # schedule feature cleanup
    s2 = schedule.every(1).day
    s2.at(SLACK_REMINDER_TIME).do(delete_removed_features)

    # Schedule rollouts
    s3 = schedule.every(1).hour
    s3.do(progress_rolled_toggles)

    while True:
        sleep_time = schedule.next_run() - datetime.now()
        print(f'Next job to run at {schedule.next_run()}, which is {str(sleep_time)} from now.')
        time.sleep(max(1, sleep_time.seconds))
        schedule.run_pending()
