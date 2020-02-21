jQuery(document).ready(function(){
  jQuery('.sfmwa').not('.sfmw-mini-action').click(function() {
    jQuery('.sfmwa').hide();
    jQuery('.sfmwc').show().css('display', 'block');

    jQuery(this).siblings('.sfmwma').show().css('display', 'block');
  });

  jQuery('.sfmwc').click(function() {
    jQuery('.sfmwa').show();
    jQuery('.sfmwc').hide();

    jQuery('.sfmwma').hide();
  });
});
