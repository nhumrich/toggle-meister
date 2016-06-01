#!/bin/sh

echo ---Running serf---

/app/migrate-db.sh
if [ "$DEBUG" == "true" ];
then
  nodemon --exec "python3 -u" /app/run.py -i /app/tmeister/static/jspm_packages/

else
  python3 -u /app/run.py
fi