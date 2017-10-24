module.exports = [
  { name: 'Content', path: '/admin/content', hide: ['td.views-field.views-field-changed'], clickpath: [
    { selector: '#view-title-table-column a' }
  ]},
  '/admin/content/scheduled',
  { name: 'Files', path: '/admin/content/files', hide: ['td.views-field.views-field-changed', 'td.views-field.views-field-created'], clickpath: [
    { selector: '#view-filename-table-column a', offset: -150 }
  ]},
  { name: 'Media', path: '/admin/content/media', hide: ['td.views-field.views-field-changed'], clickpath: [
    { selector: '#view-name-table-column a', offset: -150 }
  ]},
  '/node/add',
  '/node/add/article',
  // Meta tags token browser
  { name: 'Meta tags token browser', path: '/node/add/article', clickpath: [
    { selector: '#edit-field-meta-tags-0 [role=button]', wait: '#edit-field-meta-tags-0-basic' },
    { selector: '.token-dialog', wait: '.token-tree' }
  ]},
  // Paragraphs
  { name: 'Paragraphs', path: '/node/add/article', clickpath: [
    { selector: '.paragraphs-bottom-add-button .paragraph-type-add-modal-button', wait: '.paragraphs-add-dialog' },
    { selector: '[name="field_paragraphs_text_add_more"]', wait: '[data-drupal-selector="edit-field-paragraphs-0-subform"]'},
    { selector: '.paragraphs-bottom-add-button .paragraph-type-add-modal-button', wait: '.paragraphs-add-dialog' },
    { selector: '[name="field_paragraphs_quote_add_more"]', wait: '[data-drupal-selector="edit-field-paragraphs-1-subform"]'},
    { selector: '.paragraphs-bottom-add-button .paragraph-type-add-modal-button', wait: '.paragraphs-add-dialog' },
    { selector: '[name="field_paragraphs_link_add_more"]', wait: '[data-drupal-selector="edit-field-paragraphs-2-subform"]'},
    { selector: '.paragraphs-bottom-add-button .paragraph-type-add-modal-button', wait: '.paragraphs-add-dialog' },
    { selector: '[name="field_paragraphs_instagram_add_more"]', wait: '[data-drupal-selector="edit-field-paragraphs-3-subform"]'},
    { selector: '.paragraphs-bottom-add-button .paragraph-type-add-modal-button', wait: '.paragraphs-add-dialog' },
    { selector: '[name="field_paragraphs_twitter_add_more"]', wait: '[data-drupal-selector="edit-field-paragraphs-4-subform"]'},
    { selector: '.paragraphs-bottom-add-button .paragraph-type-add-modal-button', wait: '.paragraphs-add-dialog' },
    { selector: '[name="field_paragraphs_gallery_add_more"]', wait: '[data-drupal-selector="edit-field-paragraphs-5-subform"]'},
    { selector: '.paragraphs-bottom-add-button .paragraph-type-add-modal-button', wait: '.paragraphs-add-dialog' },
    { selector: '[name="field_paragraphs_image_add_more"]', wait: '[data-drupal-selector="edit-field-paragraphs-6-subform"]'},
    { selector: '.paragraphs-bottom-add-button .paragraph-type-add-modal-button', wait: '.paragraphs-add-dialog' },
    { selector: '[name="field_paragraphs_video_add_more"]', wait: '[data-drupal-selector="edit-field-paragraphs-7-subform"]'}
  ]},
  { name: 'Paragraphs modified content message', path: '/node/7/edit', clickpath: [
    { selector: '#field-paragraphs-1-edit--2', wait: '.paragraph-form-item--has-subform', offset: -150 },
    { selector: '[name="field_paragraphs_1_collapse"]', wait: '[data-drupal-selector="edit-field-paragraphs-1-top-info"] > span' },
    { selector: '[data-drupal-selector="edit-field-paragraphs-1-top-info"] > span' }
  ]},
  // Modals in paragraphs
  { name: 'Modals in paragraphs', path: '/node/add/article', element: '.ui-widget-content', clickpath: [
    { selector: '.paragraphs-bottom-add-button .paragraph-type-add-modal-button', wait: '.paragraphs-add-dialog' },
    { selector: '[name="field_paragraphs_image_add_more"]', wait: '[data-drupal-selector="edit-field-paragraphs-0-subform"]'},
    { selector: '[name="field_paragraphs_0_subform_field_image_entity_browser_entity_browser"]', wait: '#entity_browser_iframe_image_browser'},
    { switchToFrame: 'entity_browser_iframe_image_browser', wait: '#entity-browser-image-browser-form' },
    { switchToFrame: null }
  ]},
  '/node/add/page',
  '/media/add',
  '/admin/structure/block',
  { name: 'Place block modal', path: '/admin/structure/block', element: '.ui-widget-content', clickpath: [
    { selector: 'a#edit-blocks-region-header-title', wait: '.block-add-table', offset: -150}
  ]},
  '/admin/structure/block/manage/thunder_base_branding',
  '/admin/structure/types/manage/article',
  '/admin/structure/types/manage/article/fields',
  '/admin/structure/types/manage/article/form-display',
  { name: 'Article display', path: '/admin/structure/types/manage/article/display', hide: [
    '.form-item-fields-field-channel-type',
    '.form-item-fields-field-teaser-media-type'
  ]},
  '/admin/appearance',
  '/admin/modules',
  { name: 'System Information', path: '/admin/config/system/site-information', hide: ['#edit-front-page .form-item__field-wrapper'] }
]
