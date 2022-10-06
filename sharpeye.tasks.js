const options = require('./sharpeye.conf').options;

module.exports = [
  {name: 'Login', path: '/user/login', noScreenshot: true, actions: [
    {fill: [
      {$: 'form#user-login-form [name="name"]', value: options.user},
      {$: 'form#user-login-form [name="pass"]', value: options.pass}
    ]},
    {$: 'form#user-login-form input[name="op"]'}
  ]},
  {name: 'Disable autosaving', path: '/admin/config/content/autosave_form', noScreenshot: true, actions: [
    {$: '[data-drupal-selector="edit-active-on-content-entity-forms"]'},
    {$: '[data-drupal-selector="edit-submit"]'}
  ]},
  {name: 'CKEditor dialog', path: '/edit/node/36b2e2b2-3df0-43eb-a282-d792b0999c07', element: '.cke-dialog', actions: [
    {$: '[data-drupal-selector="field-paragraphs-1-edit-2"]', wait: '.paragraph-form-item--has-subform'},
    {$: '[data-drupal-selector="edit-field-paragraphs-1-subform-field-text-0-format"]'},
    {$: '//select[@data-drupal-selector="edit-field-paragraphs-1-subform-field-text-0-format"]/option[@value=\'full_html\']'},
    {$: '//div[contains(@class,"editor-change-text-format-modal")]/div[3]/div/button[1]', wait: 'div[id^=cke_edit-field-paragraphs-1-subform-field-text-0-value]'},
    {$: '//*[contains(@class,"cke_button_off") and @title="Table"]'},
    {$: '//select[contains(@class, "cke_dialog_ui_input_select")]', wait: '.cke-dialog'}
  ]}
];
