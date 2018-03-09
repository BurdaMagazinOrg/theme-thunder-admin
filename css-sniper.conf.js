const { execSync } = require('child_process');
const { existsSync } = require('fs');

module.exports = {
  fallbackThemesPath: '../../../core/themes/',
  resolver: function (base) {
    const [type, name] = base.split('-');
    if (!type || !name) return null;

    try {
      return execSync(`drush eval "echo DRUPAL_ROOT . '/'. drupal_get_path('${type}', '${name}');"`).toString('utf8');
    }
    catch (err) {
      if (type !== 'theme') return null;

      // As fallback it's expected that Thunder Admin Theme is in directory: "[docroot]/themes/contrib/thunder_admin"
      const fallbackPath = this.fallbackThemesPath + '/' + name;
      if (!existsSync(fallbackPath)) return null;

      return fallbackPath;
    }

  }
}