#!/usr/bin/env bash

# Run visual regression tests
cd ${THEME_DIR}
source ~/.nvm/nvm.sh
nvm use 6
./node_modules/.bin/sharpeye
