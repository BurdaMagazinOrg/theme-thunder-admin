#!/usr/bin/env bash

## Setup environment
# add composer's global bin directory to the path
# see: https://github.com/drush-ops/drush#install---composer
export THEME_DIR=`echo $(pwd)`
export TEST_DIR=`echo ${THEME_DIR}"/../test-dir"`
export PATH="$TEST_DIR/bin:$HOME/.composer/vendor/bin:$PATH"

# base path for update tests
export UPDATE_BASE_PATH=${TEST_DIR}-update-base

# Manual overrides of environment variables by commit messages. To override a variable add something like this to
# your commit message:
# git commit -m="Your commit message [TEST_UPDATE=true]"
#
# To override multiple variables us something like this:
# git commit -m="Your other commit message [TEST_UPDATE=true|INSTALL_METHOD=composer]"
if [[ ${TRAVIS_EVENT_TYPE} == "pull_request" ]]; then
    # These are the variables, that are allowed to be overridden
    ALLOWED_VARIABLES=("TEST_UPDATE" "INSTALL_METHOD" "SAUCE_LABS_ENABLED")
    COMMIT_MESSAGE=$(git log --no-merges -1 --pretty="%B")
    for VARIABLE_NAME in "${ALLOWED_VARIABLES[@]}"
    do
        VALUE=$(echo $COMMIT_MESSAGE | perl -lne "/[|\[]$VARIABLE_NAME=(.+?)[|\]]/ && print \$1")
        if [[ $VALUE ]]; then
            export $VARIABLE_NAME=$VALUE
        fi
    done
fi
# Do not place any code behind this line.
