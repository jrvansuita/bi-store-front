jQuery(document).ready(function(){

  jQuery('.sfmwa').not('.sfmwma').click(function() {
    jQuery('.sfmwa').hide();
    jQuery('.sfmwc').show().css('display', 'block');
    jQuery('.sfmwma img, .sfmwc').each(function() {
        jQuery(this).attr('src', jQuery(this).data('src'));
    });

    jQuery(this).siblings('.sfmwma').show().css('display', 'block');
  });

  jQuery('.sfmwc').click(function() {
    jQuery('.sfmwa').show();
    jQuery('.sfmwc').hide();

    jQuery('.sfmwma').hide();
  });
});
