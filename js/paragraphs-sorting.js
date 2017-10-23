(function ($, Drupal) {

  'use strict';

  Drupal.behaviors.paragraphsSorting = {
    attach: function (context, settings) {
      // Support for experimental paragraphs widget and also classic paragraphs widget with patch (deprecated).
      var $table = $(context).find('.field-multiple-table--paragraphs--deprecated, .field-multiple-table--paragraphs-experimental--add-in-between').once('init-paragraphs-sorting');
      if ($table.length) {
        $table.on('tabledrag-checkbox-start', function (e) {
          $table.find('.add-in-between-row').remove();
        });

        $table.on('tabledrag-checkbox-end', function (e) {
          // We have to remove the once flag right before reattaching the behaviours,
          // because otherwise they would be automatically attached in the swapping process.
          $table.data('jquery-once-init-in-between-buttons', false);

          // Support for classic paragraphs widget with patch (deprecated).
          if (typeof Drupal.behaviors.paragraphsInitAddInBetween === 'undefined') {
            Drupal.behaviors.initInBetweenButtons.attach();
          }
          else {
            Drupal.behaviors.paragraphsInitAddInBetween.attach();
          }
        });
      }
    }
  };
}(jQuery, Drupal));
