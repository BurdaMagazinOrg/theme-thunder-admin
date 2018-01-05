const options = require('./sharpeye.conf').options

module.exports = [
  { name: 'Login', path: '/user/login', noScreenshot: true, actions: [
      { $: 'form#user-login-form [name="name"]', fill:  options.user },
      { $: 'form#user-login-form [name="pass"]', fill: options.pass },
      { $: 'form#user-login-form input[name="op"]', wait: '#toolbar-administration' }
  ]},
  { name: 'Content', path: '/admin/content', hide: ['td.views-field.views-field-changed'], actions: [
    { $: '#view-title-table-column a', waitBefore: 1000 }
  ]},
  '/admin/content/scheduled',
  { name: 'Files', path: '/admin/content/files', hide: ['td.views-field.views-field-changed', 'td.views-field.views-field-created'], actions: [
    { $: '#view-filename-table-column a', offset: -150 }
  ]},
  { name: 'Media', path: '/admin/content/media', hide: ['td.views-field.views-field-changed'], actions: [
    { $: '#view-name-table-column a', offset: -150 }
  ]},
  '/node/add',
  '/node/add/article',
  // Meta tags token browser
  { name: 'Meta tags token browser', path: '/node/add/article', actions: [
    { $: '#edit-field-meta-tags-0 [role=button]', wait: '#edit-field-meta-tags-0-basic' },
    { $: '.token-dialog', wait: '.token-tree' }
  ]},
  // Paragraphs
  { name: 'Paragraphs', path: '/node/add/article', actions: [
    { $: '#edit-field-paragraphs-add-more-first-button-area-add-more', wait: '.paragraphs-add-dialog' },
    { $: '[data-type="text"]', wait: '[data-drupal-selector="edit-field-paragraphs-0-subform"]'},
    { $: '[name="first_button_add_modal"]', wait: '.paragraphs-add-dialog' },
    { $: '[data-type="quote"]', wait: '[data-drupal-selector="edit-field-paragraphs-1-subform"]'},
    { $: '[name="first_button_add_modal"]', wait: '.paragraphs-add-dialog' },
    { $: '[data-type="link"]', wait: '[data-drupal-selector="edit-field-paragraphs-2-subform"]'},
    { $: '[name="first_button_add_modal"]', wait: '.paragraphs-add-dialog' },
    { $: '[data-type="instagram"]', wait: '[data-drupal-selector="edit-field-paragraphs-3-subform"]'},
    { $: '[name="first_button_add_modal"]', wait: '.paragraphs-add-dialog' },
    { $: '[data-type="twitter"]', wait: '[data-drupal-selector="edit-field-paragraphs-4-subform"]'},
    { $: '[name="first_button_add_modal"]', wait: '.paragraphs-add-dialog' },
    { $: '[data-type="gallery"]', wait: '[data-drupal-selector="edit-field-paragraphs-5-subform"]'},
    { $: '[name="first_button_add_modal"]', wait: '.paragraphs-add-dialog' },
    { $: '[data-type="image"]', wait: '[data-drupal-selector="edit-field-paragraphs-6-subform"]'},
    { $: '[name="first_button_add_modal"]', wait: '.paragraphs-add-dialog' },
    { $: '[data-type="video"]', wait: '[data-drupal-selector="edit-field-paragraphs-7-subform"]'}
  ]},
  { name: 'Paragraphs modified content message', path: '/node/7/edit', actions: [
    { $: '#edit-field-paragraphs-1-top-links-edit-button', wait: '.paragraph-form-item--has-subform', offset: -150 },
    { $: '[data-drupal-selector="edit-field-paragraphs-1-top-links-collapse-button"]', wait: '[data-drupal-selector="edit-field-paragraphs-1-info-must-be-saved-info"]' },
    { $: '[data-drupal-selector="edit-field-paragraphs-1-info-must-be-saved-info"]'}
  ]},
  { name: 'CKEditor dialog', path: '/node/7/edit', element: 'table.cke_dialog', actions: [
    { $: '#edit-field-paragraphs-1-top-links-edit-button', wait: '.paragraph-form-item--has-subform', offset: -150 },
    { $: '//select[@data-drupal-selector="edit-field-paragraphs-1-subform-field-text-0-format"]/option[@value=\'full_html\']'},
    { $: '//div[contains(@class,"editor-change-text-format-modal")]/div[3]/div/button[1]', wait: '//div[contains(@id, "cke_edit-field-paragraphs-1-subform-field-text-0-value")]'},
    { $: '//*[contains(@class,"cke_button_off") and @title="Table"]', offset: -150 }
  ]},
  // Modals in paragraphs
  { name: 'Modals in paragraphs', path: '/node/add/article', element: '.ui-widget-content', actions: [
    { $: '#edit-field-paragraphs-add-more-first-button-area-add-more', wait: '.paragraphs-add-dialog' },
    { $: '[data-type="image"]', wait: '[data-drupal-selector="edit-field-paragraphs-0-subform"]'},
    { $: '[name="field_paragraphs_0_subform_field_image_entity_browser_entity_browser"]', wait: '#entity_browser_iframe_image_browser'},
    { switchToFrame: 'entity_browser_iframe_image_browser', wait: '#entity-browser-image-browser-form' },
    { switchToFrame: null }
  ]},
  '/node/add/page',
  '/media/add',
  '/admin/structure/block',
  { name: 'Place block modal', path: '/admin/structure/block', element: '.ui-widget-content', actions: [
    { $: 'a#edit-blocks-region-header-title', wait: '.block-add-table', offset: -150}
  ]},
  '/admin/structure/block/manage/thunder_base_branding',
  { name: 'Taxonomy term ordering', path: '/admin/structure/taxonomy/manage/channel/overview', actions: [
    { dragAndDrop: '//tr[@data-drupal-selector="edit-terms-tid20"]/td/a[@class="tabledrag-handle"]', offsetx: 150, offsety: null },
    { $: '//div[contains(@class, "tabledrag-changed-warning messages")]', waitBefore: 1000}
  ]},
  '/admin/structure/types/manage/article',
  '/admin/structure/types/manage/article/fields',
  '/admin/structure/types/manage/article/form-display',
  { name: 'Article display', path: '/admin/structure/types/manage/article/display', hide: [
    '.form-item-fields-field-channel-type',
    '.form-item-fields-field-teaser-media-type'
  ]},
  '/admin/structure',
  '/admin/appearance',
  '/admin/modules',
  '/admin/config',
  '/admin/config/development/performance',
  { name: 'System Information', path: '/admin/config/system/site-information', hide: ['#edit-front-page .form-item__field-wrapper'] },
  { name: 'Install page', path: '/core/install.php', hide: ['.site-version'] },
  { name: 'Configure details element as field group', path: '/admin/structure/types/manage/article/form-display', actions: [
    { $: '//a[@data-drupal-link-system-path="admin/structure/types/manage/article/form-display/add-group"]', offset: -150 },
    { $: '//select[@data-drupal-selector="edit-group-formatter"]/option[@value="details"]' },
    { $: '//input[@data-drupal-selector="edit-label"]', fill: 'Basis Details' },
    { $: '//input[@data-drupal-selector="edit-submit"]', waitBefore: 1000 },
    { $: '//input[@data-drupal-selector="edit-format-settings-classes"]', fill: 'content-form__form-section' },
    { $: '//input[@data-drupal-selector="edit-submit"]', waitBefore: 1000 },
    { dragAndDrop: '//tr[@data-drupal-selector="edit-fields-group-basis-details"]/td/a[@class="tabledrag-handle"]', offsetx: null, offsety: -1250  },
    { $: '//tr[@data-drupal-selector="edit-fields-group-basis-details"]/td/a[@class="tabledrag-handle"]', offset: -1250 },
    { dragAndDrop: '//tr[@data-drupal-selector="edit-fields-field-channel"]/td/a[@class="tabledrag-handle"]', offsetx: null, offsety: -80 },
    { $: '//tr[@data-drupal-selector="edit-fields-field-channel"]/td/a[@class="tabledrag-handle"]', offset: -150 },
    { $: '//input[@data-drupal-selector="edit-submit"]', waitBefore: 1000 }
  ]},
  { name: 'Check details element in frontend', path: '/node/7/edit', actions: [
    { $: '.field-group-details.content-form__form-section > summary', offset: -150, waitBefore: 1000 }
  ]},
  { name: 'Cleanup details element as field group', path: '/admin/structure/types/manage/article/form-display', actions: [
    { $: '//a[@href="/admin/structure/types/manage/article/form-display/group_basis_details/delete"]', offset: -150 },
    { $: '//input[@data-drupal-selector="edit-submit"]', waitBefore: 1000 },
    { dragAndDrop: '//tr[@data-drupal-selector="edit-fields-field-channel"]/td/a[@class="tabledrag-handle"]', offsetx: null, offsety: 80 },
    { $: '//tr[@data-drupal-selector="edit-fields-field-channel"]/td/a[@class="tabledrag-handle"]', offset: -150 },
    { $: '//input[@data-drupal-selector="edit-submit"]', waitBefore: 1000 }
  ]}
];
