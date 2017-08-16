#!/usr/bin/env bash


# Install thunder and enable Test module
# in provided folder
install_thunder() {
    cd $1

    /usr/bin/env PHP_OPTIONS="-d sendmail_path=`which true`" drush si thunder --db-url=mysql://thunder:thunder@127.0.0.1/drupal -y thunder_module_configure_form.install_modules_thunder_demo
    drush en simpletest -y
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
#    composer config repositories.thunder path ${THEME_DIR}
    composer config repositories.thunder_admin path ${THEME_DIR}
    composer require "burdamagazinorg/thunder:*" --no-progress
}

apply_patches() {
    cd ${TEST_DIR}/docroot

    #EXAMPLE:
    # apply cookie expire patch for javascript tests
    #wget https://www.drupal.org/files/issues/test-session-expire-2771547-64.patch
    #patch -p1 < test-session-expire-2771547-64.patch
}

create_testing_dump() {
    cd ${TEST_DIR}/docroot

    php ./core/scripts/db-tools.php dump-database-d8-mysql | gzip > thunder.php.gz
}
# Build current revision of thunder
composer_create_thunder

# Install Thunder
install_thunder ${TEST_DIR}/docroot

create_testing_dump

apply_patches
