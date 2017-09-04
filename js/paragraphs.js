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

        // Highlight edit button when mouse is over clickable element.
        $this.hover(function () {
          $(this).siblings('.paragraph-form-item__actions').find('.edit > button').addClass('button--highlight');
        }, function () {
          $(this).siblings('.paragraph-form-item__actions').find('.edit > button').removeClass('button--highlight');
        });
      });

      // Fix keyboard events on buttons.
      $paragraphWidget.find('.paragraph-form-item__links .js-form-submit').on('keypress', function (event) {
        var key = event.charCode || event.keyCode;
        if ((key === 32) || (key === 13)) {
          $(this).trigger('mousedown');
        }
      });
    }
  };

})(jQuery, Drupal);
