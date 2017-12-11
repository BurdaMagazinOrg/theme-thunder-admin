// Options for sharpeye
exports.options = {
  // The base URL of the website.
  baseUrl: 'http://localhost:8080',
  // Username of admin user.
  user: 'admin',
  // Password of admin user.
  pass: 'admin',
  // Specify the mismatch tolerance of the comparison.
  misMatchTolerance: 0.04
};

var jobID = process.env.TRAVIS_JOB_ID;
if (jobID !== undefined) {
  // Specify directories, in which screenshots should be saved.
  // They will get a postfix of '/screen', '/reference' and '/diff', respectively.
  exports.options.screenBaseDirectory = '/tmp/sharpeye/' + jobID;
  exports.options.diffBaseDirectory = '/tmp/sharpeye/' + jobID;
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
  capabilities: [
    {
      browserName: 'chrome'
    }
  ]
};
