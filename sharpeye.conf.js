// Options for sharpeye
exports.options = {
  // The base URL of the website.
  baseUrl: 'http://localhost:8080',
  // Username and password for the admin user.
  user: 'admin',
  pass: 'admin',
  // Username and password for an editor user.
  editorUser: 'test-editor',
  editorPass: 'test-editor',
  // Specify the mismatch tolerance of the comparison.
  misMatchTolerance: 0
};

var jobID = process.env.TRAVIS_JOB_ID;
if (jobID !== undefined) {
  // Specify directories, in which screenshots should be saved.
  exports.options.screenshotPath = '/tmp/sharpeye/' + jobID;
}

// Webdriver.io config overwrites.
exports.config = {
  // ============
  // Capabilities
  // ============
  // Define your capabilities here. WebdriverIO can run multiple capabilities at the same
  // time. Depending on the number of capabilities, WebdriverIO launches several test
  // sessions. Within your capabilities you can overwrite the spec and exclude options in
  // order to group specific specs to a specific capability.
  //
  // https://sites.google.com/a/chromium.org/chromedriver/capabilities
  // https://github.com/mozilla/geckodriver/blob/master/README.md#webdriver-capabilities
  //
  deprecationWarnings: false,
  logLevel: 'silent',
  capabilities: [
    {
      browserName: 'chrome'
    }
  ]
};
