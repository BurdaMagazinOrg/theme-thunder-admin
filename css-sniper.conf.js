const { execSync } = require('child_process');

module.exports = {
  resolver: function (base) {
    const [type, name] = base.split('-');
    if (!type || !name) return null;
    return execSync(`drush eval "echo DRUPAL_ROOT . '/'. drupal_get_path('${type}', '${name}');"`).toString('utf8');
  }
}