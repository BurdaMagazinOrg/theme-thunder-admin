const options = require('./sharpeye.conf').options;

module.exports = [
  {name: 'Login', path: '/user/login', noScreenshot: true, actions: [
    {fill: [
      {$: 'form#user-login-form [name="name"]', value: options.user},
      {$: 'form#user-login-form [name="pass"]', value: options.pass}
    ]},
    {$: 'form#user-login-form input[name="op"]'}
  ]},
  // {name: 'Disable autosaving', path: '/admin/config/content/autosave_form', noScreenshot: true, actions: [
  //   {$: '[data-drupal-selector="edit-active-on-content-entity-forms"]'},
  //   {$: '[data-drupal-selector="edit-submit"]'}
  // ]},
  {name: 'Content lock disabled form elements', path: '/edit/node/36b2e2b2-3df0-43eb-a282-d792b0999c07', fullPage: true, replace: [
    {$: '//*[@id="edit-meta-changed"]/text()', value: ' 01/01/2018 - 00:00'},
    {$: '//div[@data-drupal-messages=""]/div/ul/li[1]', value: 'This content is being edited by the user admin and is therefore locked to prevent other users changes. This lock is in place since X sec.'}
  ], actions: [
    {$: '#edit-author > summary'},
    {$: '#edit-scheduler-settings > summary'}
  ]},
];

