const { execSync } = require('child_process');
const { existsSync } = require('fs');

module.exports = {
  candidateThemePaths: [
    '../../../themes/contrib',
    '../../../core/themes'
  ],
  candidateModulePaths: [
    '../../../modules/contrib',
    '../../../core/modules'
  ],
  resolver: function (base) {
    const [type, name] = base.split('-');
    if (!type || !name) return null;
    let candidatePaths, foundPath;

    // Return expected directory. Thunder Admin Theme is in directory: "[docroot]/themes/contrib/thunder_admin"
    if (type === 'theme') {
      candidatePaths = this.candidateThemePaths;
    }
    else if (type === 'module') {
      candidatePaths = this.candidateModulePaths;
    }

    candidatePaths.forEach((modulePath) => {
      const candidatePath = modulePath + '/' + name;
      if (existsSync(candidatePath)) {
        foundPath = candidatePath;
      }
    });

    if (foundPath) return foundPath;

    try {
      return execSync(`drush eval "echo DRUPAL_ROOT . '/'. drupal_get_path('${type}', '${name}');"`).toString('utf8');
    }
    catch (err) {
      if (type !== 'theme') return null;
      /* eslint no-console: "error" */
      console.log('Could not determine directory for ${type} ${name}');
      return null;
    }
  }
};

