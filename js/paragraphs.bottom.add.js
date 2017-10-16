/**
 * @file paragraphs.bottom.add.js
 *
 */

(function ($, Drupal, drupalSettings) {

  'use strict';

  if (typeof Drupal.thunderAdmin === 'undefined') {
    Drupal.thunderAdmin = {};
  }

  /**
   * Add single in between button row.
   *
   * @param {Element} descriptionElement
   *   Description element.
   */
  Drupal.thunderAdmin.addParagraphsBottomAddButton = function (descriptionElement) {
    // Create row with add in between button.
    var str = '' +
      '<div class="paragraphs-bottom-add-button paragraph-type-add-modal">' +
      '  <input class="paragraph-type-add-modal-button button--small js-show button js-form-submit form-submit" type="submit" value="+ Add">' +
      '</div>';
    var $buttonRow = $.parseHTML(str);

    $($buttonRow).insertBefore(descriptionElement);
  };

  /**
   * Behaviour for click of last "+ Add" button. It's outside of paragraphs list.
   *
   * @type {{attach: attach}}
   */
  Drupal.behaviors.paragraphsBottomAddButtonClick = {
    attach: function (context) {
      $('.paragraphs-bottom-add-button.paragraph-type-add-modal .paragraph-type-add-modal-button', context)
        .once('add-click-handler')
        .on('click', function () {
          var $button = $(this);
          var $bottom_button_wrapper = $button.closest('.paragraphs-bottom-add-button').siblings('.paragraphs-add-button-wrapper');

          // If button when paragraphs are emtpy, then find sibling 'clearfix'.
          if ($bottom_button_wrapper.length === 0) {
            $bottom_button_wrapper = $button.closest('.paragraphs-bottom-add-button').siblings('.clearfix').find('.paragraphs-add-button-wrapper');
          }

          var $add_more_wrapper = $bottom_button_wrapper.siblings('.paragraphs-add-dialog');

          // Set delta before dialog is created.
          Drupal.paragraphsAddModal.setDelta($add_more_wrapper, '');
          Drupal.paragraphsAddModal.openDialog($add_more_wrapper, $button.val());

          // Stop default execution of click event.
          event.preventDefault();
          event.stopPropagation();
        });
    }
  };

  /**
   * Click handler for click "Add" button between paragraphs.
   *
   * @type {Object}
   */
  Drupal.behaviors.paragraphsBottomAddButton = {
    attach: function (context) {
      $('.paragraphs-add-button-wrapper', context).once('paragraphs-bottom-add-button').each(
        function () {
          var $wrapper = $(this);

          // Get description for paragraphs with table.
          var $description = $wrapper.parent().siblings('.description');

          if ($description.length === 0) {
            // Get description for paragraphs without table (no paragraphs).
            $description = $wrapper.siblings('.description');
          }

          if ($description.length === 0) {
            return;
          }

          Drupal.thunderAdmin.addParagraphsBottomAddButton($description);

          // Trigger attaching of behaviours for added buttons.
          Drupal.behaviors.paragraphsBottomAddButtonClick.attach(context);
        }
      );
    }
  };

}(jQuery, Drupal, drupalSettings));
