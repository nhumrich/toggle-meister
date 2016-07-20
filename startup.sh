#!/bin/bash -e

echo ---Running serf---

./migrate-db.sh
if [ "$DEBUG" == "true" ];
then
  nodemon --exec "python3 -u" run.py -i /app/tmeister/static/jspm_packages/

else
  python3 -u run.py
fi