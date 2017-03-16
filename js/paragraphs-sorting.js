(function ($, Drupal) {

  'use strict';

  /**
   * Adds a sorting button to the top of the table and adds checkboxes to the rows.
   *
   * On click on the sorting button, show/hide the checkboxes and add/remove sorting targets.
   */
  Drupal.tableDrag.prototype.initCkbx = function () {
    // add sorting toggle button on top
    this.$table.before($('<button type="button" class="tabledrag-toggle-checkbox"></button>')
      .on('click', $.proxy(function (e) {
        e.preventDefault();
        this.toggleCheckboxes();
        this.toggleSortTargets();
      }, this))
      .text(Drupal.t('Sort'))
      .wrap('<div class="tabledrag-toggle-checkbox-wrapper"></div>')
      .parent()
    );

    // add sorting checkbox to items
    this.$table.find('.tabledrag-handle').after(
      $('<input type="checkbox" class="tabledrag-checkbox" />')
        .hide()
    );
  };

  /**
   * Adds/Removes sort targets.
   */
  Drupal.tableDrag.prototype.toggleSortTargets = function () {
    var $targetWrapper = this.$table.find('.tabledrag-sort-target-wrapper');

    if ($targetWrapper.length === 0) {
      this.addSortTargets();
    }
    else {
      this.removeSortTargets();
    }
  };

  /**
   * Adds sorting targets to the table, which handle the sorting on click.
   */
  Drupal.tableDrag.prototype.addSortTargets = function () {
    var $target = $('<a href="#" class="tabledrag-sort-target">Sort here</a>')
      .on('click', $.proxy(function (e) {
        e.preventDefault();

        var $targetWrapper = $(e.target).closest('tr');
        var row = $targetWrapper.next();
        var swapAfter = false;

        // on click on the last target, the rows should be inserted after the last row.
        if ($targetWrapper.hasClass('tabledrag-sort-after')) {
          row = $targetWrapper.prev();
          swapAfter = true;
        }

        this.removeSortTargets();
        this.sort(row, swapAfter);
        this.addSortTargets();

      }, this))
      .wrap('<tr class="tabledrag-sort-target-wrapper"><td class="tabledrag-sort-target-column" colspan="3"></td></tr>')
      .parent().parent();

    this.$table.find('.draggable').before($target);
    this.$table.find('.draggable:last').after($target.clone(true).addClass('tabledrag-sort-after'));

  };

  /**
   * Removes all sorting targets from the table.
   */
  Drupal.tableDrag.prototype.removeSortTargets = function () {
    this.$table.find('.tabledrag-sort-target-wrapper').remove();
  };

  /**
   * Switches the visibility between the tabledrag checkbox and handle.
   */
  Drupal.tableDrag.prototype.toggleCheckboxes = function () {
    this.$table.find('.tabledrag-handle').toggle();
    this.$table.find('.tabledrag-checkbox').toggle();
  };

  /**
   * Sorts all selected rows before/after a specified row.
   *
   * @param {Object} row - row before/after which selected rows should be inserted.
   * @param {boolean} swapAfter - if the rows should be inserted after specified row
   */
  Drupal.tableDrag.prototype.sort = function (row, swapAfter) {
    swapAfter = swapAfter || false;

    var checkboxes = this.$table.find('input.tabledrag-checkbox:checked');
    var rowsToBeMoved = checkboxes.closest('tr.draggable');

    // Iterate over selected rows and swap each separately.
    rowsToBeMoved.each($.proxy(function (index, element) {
      var currentRow = new this.row(rowsToBeMoved[index], 'pointer', self.indentEnabled, self.maxDepth, true);
      this.rowObject = currentRow;

      if (swapAfter) {
        currentRow.swap('after', row);
      }
      else {
        currentRow.swap('before', row);
      }

      currentRow.markChanged();

      // also updates the weights.
      this.updateFields(currentRow.element);
    }, this));

    this.restripeTable();

    checkboxes.attr('checked', false);

    this.onDrop();

  };


  Drupal.behaviors.paragraphs = {
    attach: function (context, settings) {
      for (var base in settings.tableDrag) {
        if (settings.tableDrag.hasOwnProperty(base)) {
          var $table = $(context).find('#' + base).once('tabledrag-checkbox');
          if ($table.length) {
            Drupal.tableDrag[base].initCkbx();
          }
        }
      }
    }
  };

})(jQuery, Drupal);
