#!/usr/bin/env bash

# Rebuild caches and start servers
cd ${TEST_DIR}/docroot

# Final cache rebuild, to make sure every code change is respected
drush cr

# Run the webserver
drush runserver --default-server=builtin 8080 &>/dev/null &

# Run Selenium2 Server
docker run -d -p 4444:4444 --name selenium-hub selenium/hub:3.4.0-einsteinium
docker run -d --add-host="docker:172.17.0.1" --link selenium-hub:hub selenium/node-chrome:3.4.0-einsteinium
docker ps -a
