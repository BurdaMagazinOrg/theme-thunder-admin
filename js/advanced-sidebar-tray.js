/**
 * @file
 * Responsive advanced sidebar tray.
 *
 * This also supports collapsible navigable is the 'is-collapsible' class is
 * added to the main element, and a target element is included.
 */
(function ($, Drupal) {

  'use strict';

  /**
   * Initialise the tabs JS.
   */
  Drupal.behaviors.advancedSidebarTray = {
    attach: function (context) {
      var $body = $(context).find('body.advanced-sidebar-tray');
      var $toggleBtn = $body.find('.form__advanced-toggle');
      if ($body.length && $toggleBtn.length) {
        $toggleBtn.unbind('click').on('click', function (e) {
          e.preventDefault();
          $body.toggleClass('advanced-sidebar-tray-open');
        });
      }
    }
  };

})(jQuery, Drupal);
