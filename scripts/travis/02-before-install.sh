#!/usr/bin/env bash

# update composer
composer self-update

# Get selenium docker images
docker pull selenium/hub:3.4.0-einsteinium
docker pull selenium/node-chrome:3.4.0-einsteinium
ifconfig

# remove xdebug to make php execute faster
phpenv config-rm xdebug.ini

# Install Drush and drupalorg_drush module
composer global require drush/drush:^8.1 drupal/coder
phpenv rehash
drush dl drupalorg_drush-7.x

# Install the PECL YAML extension for strict parsing. yes is used to
# acknowledge all prompts.
if [[ $TRAVIS_PHP_VERSION = '5.6' ]] ; then
  yes '' | pecl install yaml;
elif [[ $TRAVIS_PHP_VERSION = '7.1' ]] ; then
 yes '' | pecl install yaml-2.0.0;
fi;

# Set MySQL Options
mysql -e "SET GLOBAL wait_timeout = 5400;"
mysql -e "SHOW VARIABLES LIKE 'wait_timeout';"

# Prepare MySQL user and database
mysql -e "CREATE DATABASE drupal;"
mysql -e "CREATE USER 'thunder'@'localhost' IDENTIFIED BY 'thunder';"
mysql -e "GRANT ALL ON drupal.* TO 'thunder'@'localhost';"

# PHP conf tweaks
echo 'max_execution_time = 120' >> drupal.php.ini;
echo 'sendmail_path = /bin/true' >> drupal.php.ini;
echo 'always_populate_raw_post_data = -1' >> drupal.php.ini;
phpenv config-add drupal.php.ini
phpenv rehash

# Prepare test directory
mkdir -p ${TEST_DIR}

# Clear drush release history cache, to pick up new releases.
rm -f ~/.drush/cache/download/*---updates.drupal.org-release-history-*
