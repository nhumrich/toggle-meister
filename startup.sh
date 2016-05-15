#!/bin/sh

echo ---Running serf---

/app/migrate-db.sh
if [ "$DEBUG" == "true" ];
then
  nodemon --exec "python3 -u" /app/serf.py -i /app/serf/static/jspm_packages/

else
exec python3 -u /app/serf.py
fi