// Options for sharpeye
exports.options = {
  // The base URL of the website.
  baseUrl: 'http://127.0.0.1:8080',
  // Username of admin user.
  user: 'admin',
  // Password of admin user.
  pass: '1234',
  // Specify directory, in which screenshots should be saved.
  screenshotDirectory: 'screenshots'
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
  //
  capabilities: [
    {
      browserName: 'firefox'
    },
    {
      browserName: 'chrome'
    }
  ]
};
