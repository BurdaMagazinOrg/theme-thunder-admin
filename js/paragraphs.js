/**
 * @file
 * Adjustments for Paragraphs widget.
 *
 * This adds the "click to edit" functionality for the Paragraph widget.
 */
(function ($, Drupal) {

  'use strict';

  Drupal.behaviors.thunderParagraphs = {
    attach: function (context) {
      var $paragraphWidget = $(context).find('.field--widget-entity-reference-paragraphs');

      $paragraphWidget.find('.field-multiple-table .paragraph-form-item__preview').once('thunder-paragraph').each(function () {
        var $this = $(this);

        $this.addClass('clickable').on('click', function (e) {
          $this.parent().find('.edit button').trigger('mousedown');
          e.preventDefault();
        });
      });
    }
  };

})(jQuery, Drupal);
