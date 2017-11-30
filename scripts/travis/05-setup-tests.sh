#!/usr/bin/env bash

# Rebuild caches and start servers
cd ${TEST_DIR}/docroot

# Final cache rebuild, to make sure every code change is respected
drush cr

# Pre-create all image styles for entity browser. ${FILE_NAME:20} will remove "sites/default/files/" from path.
# Execution of this code is based when bash is in "docroot" folder.
drush -i themes/contrib/thunder_admin/scripts/drush seed-image-derivatives --include=all

# Run the webserver
drush runserver --default-server=builtin 0.0.0.0:8080 &>/dev/null &

# Run Selenium2 server with Browser relevant for running environment
if [[ ${SHARPEYE_BROWSER} == "chrome" ]]; then
    docker pull selenium/standalone-chrome:3.4.0-einsteinium
    docker run -d -p 4444:4444 --shm-size 256m --net=host selenium/standalone-chrome:3.4.0-einsteinium
elif [[ ${SHARPEYE_BROWSER} == "firefox" ]]; then
    docker pull selenium/standalone-firefox:3.4.0-einsteinium
    docker run -d -p 4444:4444 --shm-size 256m --net=host selenium/standalone-firefox:3.4.0-einsteinium
fi

docker ps -a
