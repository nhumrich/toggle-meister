#!/bin/bash -e

if [ "$SKIP_MIGRATIONS" != "True" ];
then
./migrate-db.sh
fi

python3 -u run.py
