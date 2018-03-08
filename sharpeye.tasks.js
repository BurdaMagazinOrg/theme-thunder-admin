const options = require('./sharpeye.conf').options

module.exports = [
  { name: 'Login', path: '/user/login', noScreenshot: true, actions: [
      { $: 'form#user-login-form [name="name"]', fill:  options.user },
      { $: 'form#user-login-form [name="pass"]', fill: options.pass },
      { $: 'form#user-login-form input[name="op"]', wait: '#toolbar-administration' }
  ]},
  { name: 'Content', path: '/admin/content', actions: [
    { $: '#view-title-table-column a', waitBefore: 1000 },
    { $: 'td.views-field.views-field-changed', replace: '01/01/2018 - 00:00' }
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
  { name: 'Entity browser gallery', path: '/node/7/edit', actions: [ // viewports: , viewportChangePause: 3000, actions: [
    { $: '[data-drupal-selector="edit-field-paragraphs-0-top-links-edit-button"]', wait: '.paragraph-form-item--has-subform', offset: -150 },
    { $: '[data-drupal-selector="edit-field-paragraphs-0-subform-field-media-0-inline-entity-form-field-media-images-entity-browser-entity-browser-open-modal"]', wait: '#entity_browser_iframe_multiple_image_browser', offset: -150 },
    { switchToFrame: 'entity_browser_iframe_multiple_image_browser', wait: '#edit-name--description' },
    { $: '#edit-name--description' },
    { switchToFrame: null }
  ]},
  { name: 'Nested table sort', path: '/node/7/edit', actions: [
    { $: '//*[@id="field-paragraphs-values"]/tbody/tr[7]/td/div/input' },
    { $: '//*[@id="ui-id-3"]/ul/li[3]/button'},
    { $: '//input[@data-drupal-selector="edit-field-paragraphs-5-subform-field-link-0-uri"]', fill: 'http://example.com/1', waitBefore: 2000 },
    { $: '//input[@data-drupal-selector="edit-field-paragraphs-5-subform-field-link-add-more"]'},
    { $: '//input[@data-drupal-selector="edit-field-paragraphs-5-subform-field-link-1-uri"]', fill: 'http://example.com/2', waitBefore: 1000 },
    { $: '//*[@data-drupal-selector="edit-field-paragraphs-5-subform-field-link-wrapper"]/div/div/table/thead/tr[2]/th/button', offset: -150 },
    { $: '//*[@data-drupal-selector="edit-field-paragraphs-5-subform-field-link-wrapper"]/div/div/table/tbody/tr[4]/td[1]/input', offset: -150 },
    { $: '//*[@data-drupal-selector="edit-field-paragraphs-5-subform-field-link-wrapper"]/div/div/table/tbody/tr[1]/td/a', offset: -150 }
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
  { name: 'Status page', path: '/admin/reports/status', remove: ['#block-thunder-admin-content > div.system-status-report > div:nth-child(2) > details:nth-of-type(1):not(:only-of-type)'], actions: [
    { $: '//*[@id="block-thunder-admin-content"]/div[1]/div[2]/span/span[2]/span[1]', replace: 'X Warnings' },
    { $: '//*[@id="block-thunder-admin-content"]/div[1]/div[3]/span/span[2]/span[1]', replace: 'X Checked' },
    { $: '//*[@id="block-thunder-admin-content"]/div[2]/div/div[1]/div/text()', replace: '8.x.x' },
    { $: '//*[@id="block-thunder-admin-content"]/div[2]/div/div[2]/div/text()[2]', replace: 'Last run 00 hours 00 minutes ago' },
    { $: '//*[@id="block-thunder-admin-content"]/div[2]/div/div[3]/div/text()[2]', replace: 'Apache/x.x.xx (Unix) OpenSSL/x.x.x mod_fcgid/x.x.x\n' },
    { $: '//*[@id="block-thunder-admin-content"]/div[2]/div/div[4]/div/text()[3]', replace: '7.x.xx (' },
    { $: '//*[@id="block-thunder-admin-content"]/div[2]/div/div[4]/div/text()[5]', replace: 'xxxM' },
    { $: '//*[@id="block-thunder-admin-content"]/div[2]/div/div[5]/div/text()[3]', replace: 'x.x.x-xx.x-log\n\n' },
    { $: '//*[@id="block-thunder-admin-content"]/div[2]/div/div[5]/div/text()[4]', replace: 'MySQL, MariaDB, Percona Server, or equivalent\n\n' },
    { $: '//*[@id="block-thunder-admin-content"]/div[3]/div[3]/details[5]/div', replace: 'x.x.x-xx.x-log' },
    { $: '//*[@id="block-thunder-admin-content"]/div[3]/div[3]/details[10]/div', replace: 'bundled (x.x.x compatible)\n' },
    { $: '//*[@id="block-thunder-admin-content"]/div[3]/div[3]/details[14]/div/text()[1]', replace: '\n7.x.xx (' },
    { $: '//*[@id="block-thunder-admin-content"]/div[3]/div[3]/details[16]/div', replace: 'xxxM' },
    { $: '//*[@id="block-thunder-admin-content"]/div[3]/div[3]/details[19]/div/text()[1]', replace: 'Server time: 01 January 2018, 00:00:00 +00:00' },
    { $: '//*[@id="block-thunder-admin-content"]/div[3]/div[3]/details[19]/div/div/em[4]', replace: ' 01 January 2018, 00:00:00 +00:00 UTC UTC' },
    { $: '//*[@id="block-thunder-admin-content"]/div[3]/div[3]/details[22]/div/div/text()[2]', replace: ' was generated 00 hours 00 min ago. Run cron, or ' },
    { $: '//*[@id="block-thunder-admin-content"]/div[3]/div[3]/details[24]/div/div', replace: 'Your server is not capable of displaying file upload progress.' },
    { $: '//*[@id="block-thunder-admin-content"]/div[3]/div[3]/details[25]/div/text()', replace: 'PHP 7.x.xx Development Server' }
  ]},
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
  { name: 'Input format Basic HTML', path: '/admin/config/content/formats/manage/basic_html', actions: [
    { $: '//*[@id="editor-settings-wrapper"]/div[2]/div/div[1]/ul/li[1]/a/span[1]', replace: 'Uploads enabled, max size: XXX MB' },
    { $: '//*[@id="editor-settings-wrapper"]/div[2]/div/div[1]/ul/li[4]/a', offset: -150 },
  ]},
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
  ]},
  { name: 'Resize tabs', path: '/admin/structure/types/manage/article/display', viewports: [{width: 400, height: 800}], hide: [
    '.form-item-fields-field-channel-type',
    '.form-item-fields-field-teaser-media-type'
  ], actions: [
    { $: '//details[@data-drupal-selector="edit-modes"]' },
    { $: '//input[@data-drupal-selector="edit-display-modes-custom-diff"]' },
    { $: '//input[@data-drupal-selector="edit-display-modes-custom-full"]' },
    { $: '//input[@data-drupal-selector="edit-display-modes-custom-search-index"]' },
    { $: '//input[@data-drupal-selector="edit-display-modes-custom-search-result"]' },
    { $: '//input[@data-drupal-selector="edit-display-modes-custom-token"]' },
    { $: '//input[@data-drupal-selector="edit-submit"]', waitBefore: 1000 },
    { $: '//a[@data-toolbar-tray="toolbar-item-administration-tray"]'}
  ]},
  { name: 'Open tabs', path: '/admin/structure/types/manage/article/display', viewports: [{width: 399, height: 800}], hide: [
    '.form-item-fields-field-channel-type',
    '.form-item-fields-field-teaser-media-type'
  ], actions: [
    { $: '//button[contains(@class, "tabs__trigger")]', waitBefore: 1000 },
  ]}
];
