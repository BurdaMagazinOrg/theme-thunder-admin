const { execSync } = require('child_process');
const { existsSync } = require('fs');

module.exports = {
  assumedThemesPath: '../../../core/themes/',
  resolver: function (base) {
    const [type, name] = base.split('-');
    if (!type || !name) return null;

    // Return expected directory. Thunder Admin Theme is in directory: "[docroot]/themes/contrib/thunder_admin"
    const assumedPath = this.assumedThemesPath + '/' + name;
    if (existsSync(assumedPath)) {
      return assumedPath;
    }

    try {
      return execSync(`drush eval "echo DRUPAL_ROOT . '/'. drupal_get_path('${type}', '${name}');"`).toString('utf8');
    }
    catch (err) {
      if (type !== 'theme') return null;

      console.log('Could not determine directory for ${type} ${name}');
      return null;
    }
  }
}

