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
  {name: 'Content', path: '/admin/content', fullPage: true, replace: [
    {$: 'td.views-field.views-field-changed', value: '01/01/2018 - 00:00'}
  ], actions: [
    {$: '#view-title-table-column a', waitBefore: 1000}
  ]},
  {path: '/admin/content/scheduled', fullPage: true, actions: [
    {$: 'h1.page-title'},
  ]},
  {name: 'Files', path: '/admin/content/files', fullPage: true, replace: [
    {$: '.views-field-filesize', value: '99.9 KB'},
    {$: '.views-field-created, .views-field-changed', value: 'Mon, 07/08/2019 - 08:27'}
  ], actions: [
    {$: '#view-filename-table-column a'},
    {$: 'div#block-thunder-admin-page-title h1'}
  ]},
  {path: '/node/add'},
  {path: '/node/add/article', fullPage: true, replace: [{$: '//*[@id="edit-author"]/summary/span/text()', value: ' (Authored on xxxx-xx-xx)'}]},
  {name: 'Meta tags token browser', path: '/node/add/article', actions: [
    {$: '#edit-field-meta-tags-0 [role=button]', wait: '#edit-field-meta-tags-0-metatag-async-widget-customize-meta-tags'},
    {$: '#edit-field-meta-tags-0-metatag-async-widget-customize-meta-tags', wait: '[data-drupal-selector="edit-field-meta-tags-0-basic"]'},
    {$: '.token-dialog', wait: '.token-tree'}
  ]},
  {name: 'Add paragraphs modal', path: '/node/add/article', fullPage: true, replace: [
    {$: '//*[@id="edit-author"]/summary/span/text()', value: ' (Authored on xxxx-xx-xx)'}
  ], actions: [
    {$: '//*[@data-drupal-selector="edit-field-paragraphs"]//tbody/tr[last()]//button[text()="..."]', wait: '.paragraphs-add-dialog.ui-dialog-content '},
    {$: '.ui-dialog .ui-dialog-titlebar'}
  ]},
  {name: 'Paragraphs', path: '/node/add/article', fullPage: true, replace: [
    {$: '//*[@id="edit-author"]/summary/span/text()', value: ' (Authored on xxxx-xx-xx)'}
  ], actions: [
    {$: '//*[@data-drupal-selector="edit-field-paragraphs"]//tbody/tr[last()]//button[text()="+ Text"]', wait: '[data-drupal-selector="edit-field-paragraphs-0-subform"]'},
    {$: '//*[@data-drupal-selector="edit-field-paragraphs"]//tbody/tr[last()]//button[text()="..."]', wait: '.paragraphs-add-dialog.ui-dialog-content '},
    {$: '.paragraphs-add-dialog.ui-dialog-content [name="field_paragraphs_quote_add_more"]', wait: '[data-drupal-selector="edit-field-paragraphs-1-subform"]'},
    {$: '//*[@data-drupal-selector="edit-field-paragraphs"]//tbody/tr[last()]//button[text()="..."]', wait: '.paragraphs-add-dialog.ui-dialog-content '},
    {$: '.paragraphs-add-dialog.ui-dialog-content [name="field_paragraphs_link_add_more"]', wait: '[data-drupal-selector="edit-field-paragraphs-2-subform"]'},
    {$: '//*[@data-drupal-selector="edit-field-paragraphs"]//tbody/tr[last()]//button[text()="..."]', wait: '.paragraphs-add-dialog.ui-dialog-content '},
    {$: '.paragraphs-add-dialog.ui-dialog-content [name="field_paragraphs_twitter_add_more"]', wait: '[data-drupal-selector="edit-field-paragraphs-3-subform"]'},
    {$: '//*[@data-drupal-selector="edit-field-paragraphs"]//tbody/tr[last()]//button[text()="+ Gallery"]', wait: '[data-drupal-selector="edit-field-paragraphs-4-subform"]'},
    {$: '//*[@data-drupal-selector="edit-field-paragraphs"]//tbody/tr[last()]//button[text()="+ Image"]', wait: '[data-drupal-selector="edit-field-paragraphs-5-subform"]'},
    {$: '//*[@data-drupal-selector="edit-field-paragraphs"]//tbody/tr[last()]//button[text()="..."]', wait: '.paragraphs-add-dialog.ui-dialog-content '},
    {$: '.paragraphs-add-dialog.ui-dialog-content [name="field_paragraphs_video_add_more"]', wait: '[data-drupal-selector="edit-field-paragraphs-6-subform"]'}
  ]},
  {name: 'Linkit dialog', path: '/node/add/article', fullPage: true, replace: [
    {$: '//*[@id="edit-author"]/summary/span/text()', value: ' (Authored on xxxx-xx-xx)'}
  ], actions: [
    {$: '//*[@data-drupal-selector="edit-field-paragraphs"]//tbody/tr[last()]//button[text()="+ Text"]', wait: '[data-drupal-selector="edit-field-paragraphs-0-subform"]'},
    {$: '//*[contains(@class, "cke_button__drupallink")]/span[1]'},
    {$: '.ui-dialog-buttonpane'}
  ]},
  {name: 'Paragraphs modified content message', path: '/edit/node/36b2e2b2-3df0-43eb-a282-d792b0999c07', fullPage: true, replace: [
    {$: '//*[@id="edit-meta-changed"]/text()', value: ' 01/01/2018 - 00:00'}
  ], actions: [
    {$: '#field-paragraphs-1-edit--2', wait: '.cke_button__bulletedlist'},
    {$: '.cke_button__bulletedlist'},
    {$: '[name="field_paragraphs_1_collapse"]', waitBefore: 500, wait: '[data-drupal-selector="edit-field-paragraphs-1-top-icons"] .paragraphs-icon-changed'},
    {$: '[data-drupal-selector="edit-field-paragraphs-1-top-icons"] .paragraphs-icon-changed'}
  ]},
  {name: 'CKEditor dialog', path: '/edit/node/36b2e2b2-3df0-43eb-a282-d792b0999c07', actions: [
    {$: '[data-drupal-selector="field-paragraphs-1-edit-2"]', wait: '.paragraph-form-item--has-subform'},
    {$: '[data-drupal-selector="edit-field-paragraphs-1-subform-field-text-0-format"]'},
    {$: '//select[@data-drupal-selector="edit-field-paragraphs-1-subform-field-text-0-format"]/option[@value=\'full_html\']'},
    {$: '//div[contains(@class,"editor-change-text-format-modal")]/div[3]/div/button[1]', wait: 'div[id^=cke_edit-field-paragraphs-1-subform-field-text-0-value]'},
    {$: '//*[contains(@class,"cke_button_off") and @title="Table"]'},
    {$: '//select[contains(@class, "cke_dialog_ui_input_select")]', wait: '.cke_dialog'},
    {waitBefore: 500}
  ]}
];
