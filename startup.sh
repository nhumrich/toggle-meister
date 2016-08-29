#!/bin/bash -e

echo ---Running serf---

./migrate-db.sh

if [ "$NO_GUNICORN" = "true" ];
then
  python3 -u run.py
else
  gunicorn run:my_app --bind 0.0.0.0:9191 --worker-class aiohttp.worker.GunicornUVLoopWebWorker -w ${NUM_WORKERS:-2} --timeout 0
fi
