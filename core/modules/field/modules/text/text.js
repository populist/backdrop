
(function ($) {

/**
 * Auto-hide summary textarea if empty and show hide and unhide links.
 */
Backdrop.behaviors.textSummary = {
  attach: function (context, settings) {
    $('.text-summary', context).once('text-summary', function () {
      var $widget = $(this).closest('div.field-type-text-with-summary');
      var $summaries = $widget.find('div.text-summary-wrapper');

      $summaries.once('text-summary-wrapper').each(function(index) {
        var $summary = $(this);
        var $summaryLabel = $summary.find('label').first();
        var $full = $widget.find('.text-full').eq(index).closest('.form-item');
        var $fullLabel = $full.find('label').first();

        // Create a placeholder label when the field cardinality is
        // unlimited or greater than 1.
        if ($fullLabel.length == 0) {
          $fullLabel = $('<label></label>').prependTo($full);
        }

        // Setup the edit/hide summary link.
        var $link = $('<span class="field-edit-link">(<a class="link-edit-summary" href="#">' + Backdrop.t('Hide summary') + '</a>)</span>').bind('click', function(e) {
          if ($summary.css('display') !== 'none') {
            $summary.hide();
            $(this).find('a').html(Backdrop.t('Edit summary')).end().appendTo($fullLabel);
          }
          else {
            $summary.show();
            $(this).find('a').html(Backdrop.t('Hide summary')).end().appendTo($summaryLabel);
          }
          e.preventDefault();
        }).appendTo($summaryLabel);

        // If no summary is set, hide the summary field.
        if ($(this).find('.text-summary').val() == '') {
          $link.click();
        }
        return;
      });
    });
  }
};

})(jQuery);
