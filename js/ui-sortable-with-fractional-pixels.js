/**
 * @file
 * Provides improved handling of sorting ui for entity browser.
 *
 * It solves problem for drag-drop sorting for heights with fractional pixels.
 */
(function ($, Drupal) {
  'use strict';

  Drupal.behaviors.sortableFractionalPixels = {
    attach: function (context) {
      $(context)
        .find('.field--widget-entity-browser-entity-reference .entities-list, [data-drupal-selector="edit-selected"].entities-list')
        .once('ui-sortable-with-fractional-pixels')
        .sortable({
          start: function (e, ui) {
            if (typeof getComputedStyle === 'undefined') {
              return;
            }

            var $siblings = ui.placeholder.siblings(':not(.ui-sortable-helper)');
            if ($siblings.length === 0) {
              return;
            }

            var computedHeight = getComputedStyle($siblings[0]).height;
            ui.placeholder.height(computedHeight);
          }
        });
    }
  };

})(jQuery, Drupal, drupalSettings);
