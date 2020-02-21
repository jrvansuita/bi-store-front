jQuery(document).ready(function(){
  jQuery('.sfmw-action').not('.sfmw-mini-action').click(function() {
    jQuery('.sfmw-action').hide();
    jQuery('.sfmw-close').show().css('display', 'block');

    jQuery(this).siblings('.sfmw-mini-action').show().css('display', 'block');
  });

  jQuery('.sfmw-close').click(function() {
    jQuery('.sfmw-action').show();
    jQuery('.sfmw-close').hide();

    jQuery('.sfmw-mini-action').hide();
  });
});
