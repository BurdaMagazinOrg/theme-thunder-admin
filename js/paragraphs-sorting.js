
(function($, Drupal) {

  'use strict'

  Drupal.tableDrag.prototype.initCkbx = function() {
    // add sorting toggle button on top
    this.$table.before($('<button type="button" class="tabledrag-toggle-checkbox"></button>')
      .on('click', $.proxy(function(e) {
        e.preventDefault();
        this.toggleCheckboxes()
      }, this))
      .text(Drupal.t('Sort'))
      .wrap('<div class="tabledrag-toggle-checkbox-wrapper"></div>')
      .parent()
    );

    // add sorting checkbox to items
    this.$table.find('.tabledrag-handle').after(
      $('<input type="checkbox" class="tabledrag-checkbox" />')
        .hide()
    )

    // add sorting target
    var $target = $('<a href="#" class="tabledrag-sort-target">Sort here</a>')
      .on('click', $.proxy(function(e) {
        e.preventDefault()
        alert('sorted')
        console.log(e.target)
      }, this))
      .wrap('<div class="tabledrag-sort-target-wrapper"></div>')
      .parent()
      .hide()

    this.$table.find('.draggable')
      .after($target)
      .first().before($target.clone(true))

  }

  Drupal.tableDrag.prototype.toggleCheckboxes = function() {
    this.$table.find('.tabledrag-handle').toggle()
    this.$table.find('.tabledrag-checkbox').toggle()
    this.$table.find('.tabledrag-sort-target-wrapper').toggle()
  }


  Drupal.behaviors.paragraphs = {
    attach: function(context, settings) {
      for (var base in settings.tableDrag) {
        if (settings.tableDrag.hasOwnProperty(base)) {
          var $table = $(context).find('#' + base).once('tabledrag-checkbox')
          if ($table.length) {
            Drupal.tableDrag[base].initCkbx()
          }
        }
      }
    }
  }

})(jQuery, Drupal)