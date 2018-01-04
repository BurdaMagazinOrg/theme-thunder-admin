#!/usr/bin/env bash

# Compile all the stuff
cd ${THEME_DIR}
npm run dev

# Run visual regression tests
cd ${THEME_DIR}

./node_modules/.bin/sharpeye --single-browser ${SHARPEYE_BROWSER}
