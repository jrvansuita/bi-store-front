jQuery(document).ready(function(){
  jQuery('.sfmw-action').not('.sfmw-mini-action').click(function() {
    $('.sfmw-action').hide();
    $('.sfmw-close').show().css('display', 'block');

    $(this).siblings('.sfmw-mini-action').show().css('display', 'block');
  });

  jQuery('.sfmw-close').click(function() {
    $('.sfmw-action').show();
    $('.sfmw-close').hide();

    $('.sfmw-mini-action').hide();
  });
});
