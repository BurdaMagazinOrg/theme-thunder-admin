const options = require('./sharpeye.conf').options

module.exports = [
  { name: 'Login', path: '/user/login', noScreenshot: true, actions: [
    { $: 'form#user-login-form [name="name"]', fill:  options.user },
    { $: 'form#user-login-form [name="pass"]', fill: options.pass },
    { $: 'form#user-login-form input[name="op"]', wait: '#toolbar-administration' }
  ]},
  { name: 'Disable autosaving', path: '/admin/config/content/autosave_form', noScreenshot: true, actions: [
    { $: '[data-drupal-selector="edit-active-on-content-entity-forms"]'},
    { $: '[data-drupal-selector="edit-submit"]'}
  ]},
  { name: 'Admin structure', path: '/admin/structure', actions: [
    { $: 'div#block-thunder-admin-page-title h1', offset: -150 }
  ]},
  { name: 'Admin structure NEW', path: '/admin/structure', actions: [
    { moveToObject: 'body', offsetx: 0, offsety: 0 }
  ]}
];
