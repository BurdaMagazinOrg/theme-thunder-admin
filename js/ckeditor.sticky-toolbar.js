/**
 * @file
 * ckeditor sticky toolbar.
 */
(function ($, CKEDITOR) {

  'use strict';

  /**
   * Make ckeditor toolbar sticky.
   */
  Drupal.behaviors.ckeditorStickyToolbar = {
    attach: function (context) {
      // Listen on toolbar changes.
      $(context).once('ckeditorStickyToolbar').on('drupalToolbarOrientationChange drupalToolbarTabChange drupalToolbarTrayChange', setPosition());
      // Listen on ckeditor instance creation.
      CKEDITOR.once('instanceReady', setPosition());

      // Fix ckeditor sticky toolbar position.
      function setPosition() {
        return function (event) {
          var toolBar = $('.cke_top', context);
          // Set sticky position.
          if (event.name === 'instanceReady') {
            toolBar.once('ckeditorStickyToolbarPosition').attr('style', toolBar.attr('style') + 'position: sticky; position: -webkit-sticky;');
          }
          // Align position.
          toolBar.css('top', $('body').css('padding-top'));
        };
      }
    }
  };
})(jQuery, CKEDITOR);
