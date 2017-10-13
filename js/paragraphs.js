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
      var $paragraphWidget = $(context).find('.field--widget-entity-reference-paragraphs,.field--widget-paragraphs');

      $paragraphWidget.find('.field-multiple-table .paragraph-form-item__preview').once('thunder-paragraph').each(function () {
        var $this = $(this);
        var $editButton = $this.siblings('.paragraph-form-item__actions').find('button.paragraph-form-item__action--edit');

        $this.addClass('clickable').on('click', function (e) {
          $editButton.trigger('mousedown');

          e.preventDefault();
        });

        // Highlight edit button when mouse is over clickable element.
        $this.hover(function () {
          $editButton.addClass('button--highlight');
        }, function () {
          $editButton.removeClass('button--highlight');
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
