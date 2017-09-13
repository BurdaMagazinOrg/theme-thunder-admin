(function ($, Drupal) {

  'use strict';

  Drupal.behaviors.paragraphsSorting = {
    attach: function (context, settings) {
      var $table = $(context).find('.field-multiple-table--paragraphs--row-based-add-in-between').once('init-paragraphs-sorting');
      if ($table.length) {
        $table.on('tabledrag-checkbox-start', function (e) {
          $table.find('.add-in-between-row').remove();
        });

        $table.on('tabledrag-checkbox-end', function (e) {
          // We have to remove the once flag right before reattaching the behaviours,
          // because otherwise they would be automatically attached in the swapping process.
          $table.data('jquery-once-init-in-between-buttons', false);
          Drupal.behaviors.initInBetweenButtons.attach();
        });
      }
    }
  };
}(jQuery, Drupal));
