(function ($, Drupal) {

  'use strict';

  Drupal.behaviors.paragraphsSorting = {
    attach: function (context, settings) {
      // Support for experimental paragraphs widget and also classic paragraphs widget with patch (deprecated).
      var $table = $(context).find('.field-multiple-table--paragraphs--deprecated, .field-multiple-table--paragraphs-experimental--add-in-between').once('init-paragraphs-sorting');
      if ($table.length) {
        $table.on('tabledrag-checkbox-start', function (e) {
          $table.find('.add-in-between-row').remove();
          $table.find('.paragraphs-features__add-in-between__row').remove();
        });

        $table.on('tabledrag-checkbox-end', function (e) {

          // Support for classic paragraphs widget with patch (deprecated).
          if (typeof Drupal.behaviors.paragraphsFeaturesAddInBetweenInit === 'undefined') {
            // We have to remove the once flag right before reattaching the behaviours,
            // because otherwise they would be automatically attached in the swapping process.
            $table.data('jquery-once-init-in-between-buttons', false);
            Drupal.behaviors.initInBetweenButtons.attach();
          }
          else {
            $table.data('jquery-once-paragraphs-features-add-in-between-init', false);
            Drupal.behaviors.paragraphsFeaturesAddInBetweenInit.attach();
          }
        });
      }
    }
  };
}(jQuery, Drupal));
