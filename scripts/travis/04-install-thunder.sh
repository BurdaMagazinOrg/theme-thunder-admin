#!/usr/bin/env bash


# Install thunder and enable Test module
# in provided folder
install_thunder() {
    cd $1

    /usr/bin/env PHP_OPTIONS="-d sendmail_path=`which true`" drush si thunder --account-pass=admin --db-url=mysql://thunder:thunder@127.0.0.1/drupal install_configure_form.enable_update_status_module=NULL -y
}

# Update thunder to current test version
update_thunder() {
    # Link sites folder from initial installation
    mv ${TEST_DIR}/docroot/sites ${TEST_DIR}/docroot/_sites
    ln -s ${UPDATE_BASE_PATH}/docroot/sites ${TEST_DIR}/docroot/sites

    cd ${TEST_DIR}/docroot

    # Execute all required updates
    drush updatedb -y

    # Adjust theme logo path because it can be different in case of composer build
    drush -y php-eval "Drupal::configFactory()->getEditable('thunder_base.settings')->set('logo.path', drupal_get_path('profile', 'thunder') . '/themes/thunder_base/images/Thunder-white_400x90.png')->save(TRUE);"
}

composer_create_thunder() {
    cd ${THEME_DIR}
    composer create-project burdamagazinorg/thunder-project:2.x ${TEST_DIR} --stability dev --no-interaction --no-install

    cd ${TEST_DIR}

    # Drush 8 is needed as long as there is no drush 9 command version for image-derive-all
    composer require drush/drush:~8.1

    rm -rf docroot/themes/contrib/thunder_admin/
    ln -s ${THEME_DIR} docroot/themes/contrib/thunder_admin
}

apply_patches() {
    cd ${TEST_DIR}/docroot

    #EXAMPLE:
    # apply cookie expire patch for javascript tests
    #wget https://www.drupal.org/files/issues/test-session-expire-2771547-64.patch
    #patch -p1 < test-session-expire-2771547-64.patch
}

install_theme_dependencies() {
  cd ${THEME_DIR}
  source ~/.nvm/nvm.sh
  nvm use 6
  npm install -g yarn
  yarn --ignore-scripts

}
# Build current revision of thunder
composer_create_thunder

# Install theme dependencies
install_theme_dependencies

# Install Thunder
install_thunder ${TEST_DIR}/docroot

apply_patches
