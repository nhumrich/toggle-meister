#!/bin/bash -e
opts=""

if [ "$FORCE_MIGRATION" = "true" ];
then
opts="--force"
fi

while ! nc -z $DATABASE_URL 5432; do sleep 4; done
alembic upgrade head


if [ "$SEED_MIGRATION" = "true" ];
then
echo "no seed script yet"
fi
