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
   * Initialise the advanced sidebar tray JS.
   */
  Drupal.behaviors.advancedSidebarTray = {
    attach: function (context) {
      var $body = $(context).find('body.advanced-sidebar-tray');
      // Add a click handler to the button(s) that toggle the advanced sidebar
      // tray.
      var $toggleBtn = $body.find('[data-toggle-advanced-sidebar-tray]');
      if ($body.length && $toggleBtn.length) {
        $toggleBtn.unbind('click').on('click', function (e) {
          e.preventDefault();
          $body.toggleClass('advanced-sidebar-tray-toggled');
          // Remove element width added by resize.
          $body.find('.content-form__advanced').css('width', '');
          // Close the vertical toolbar tab if the toolbar layout is vertical.
          var $activeToolbarItem = $('.toolbar-item.is-active');
          if ($body.hasClass('toolbar-vertical') && $activeToolbarItem.length) {
            $activeToolbarItem.click();
          }
          // Trigger resize event.
          $(window).trigger('resize.tabs');
        });
      }
;

      /**
       * Resizeable sidebar.
       */
      $('.content-form__advanced-bar').mousedown(function (e) {
        e.preventDefault();
        $(document).mousemove(function (e) {
          e.preventDefault();
          var newWidth = $(window).width() - e.pageX;
          if (newWidth > 300 && newWidth < $(window).width() && e.pageX > 500) {
            var $tray = $('.js body.advanced-sidebar-tray');
            $tray.css('margin-right', newWidth);
            $tray.find('.toolbar-tray-horizontal').css('margin-right', newWidth);
            $tray.find('.content-form__advanced').css('width', newWidth);
          }
        });
      });
      $(document).mouseup(function (e) {
        $(document).unbind('mousemove');
        $(window).trigger('resize.tabs');
      });

    }
  };

})(jQuery, Drupal);
