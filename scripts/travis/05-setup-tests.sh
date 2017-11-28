#!/usr/bin/env bash

# Rebuild caches and start servers
cd ${TEST_DIR}/docroot

# Final cache rebuild, to make sure every code change is respected
drush cr

# Run the webserver
drush runserver --default-server=builtin 0.0.0.0:8080 &>/dev/null &

# Run Selenium2 Server
docker run -d -p 4444:4444 --name selenium-hub selenium/hub:3.4.0-einsteinium

# Run Selenium with Browser relevant for running environment
if [[ ${SHARPEYE_BROWSER} == "chrome" ]]; then
    docker run -d --add-host="docker:172.17.0.1" --link selenium-hub:hub selenium/node-chrome:3.4.0-einsteinium
elif [[ ${SHARPEYE_BROWSER} == "firefox" ]]; then
    docker run -d --add-host="docker:172.17.0.1" --link selenium-hub:hub selenium/node-firefox:3.4.0-einsteinium
fi

docker ps -a

# Set configuration for SharpEye to use browser defined by Travis CI Job
cd ${THEME_DIR}

echo "\nexports.config={\"capabilities\":[{\"browserName\":\"${SHARPEYE_BROWSER}\"}]};\n" >> sharpeye.conf.js
