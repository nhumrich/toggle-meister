#!/bin/bash -e

if [ "$SKIP_MIGRATIONS" != "True" ];
then
./migrate-db.sh
fi


if [ "$NO_GUNICORN" = "true" ];
then
  python3 -u run.py
else
  gunicorn run:app --bind 0.0.0.0:8445 --worker-class aiohttp.worker.GunicornUVLoopWebWorker -w ${NUM_WORKERS:-2} --timeout 0
fi
