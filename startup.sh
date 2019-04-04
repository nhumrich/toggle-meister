#!/bin/bash -e

if [ "$SKIP_MIGRATIONS" != "True" ];
then
./migrate-db.sh
fi

exec python3 -u run.py
