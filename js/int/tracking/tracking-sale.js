jQuery(document).ready(() => {

  jQuery('#sale').on('keypress', function (e) {
    if(e.which === 13){
      loadTrackingContent();
    }
  });

  jQuery('#go-sale').click(()=>{
    loadTrackingContent();
  });

  if (jQuery('#sale').val()){
    loadTrackingContent();
  }
});



function loadTrackingContent(callback){
  jQuery('#sale').attr("disabled", "disabled");

  var url = Def.params.trackingUrl;
  var sale = jQuery('#sale').val();
  var msgError = "";

  if(sale == ""){
    msgError = "Insira o número do pedido"
  }else if(!sale.startsWith('120') || sale.length < 9 || sale.length > 9){
    msgError = "O número do pedido está incorreto"
  }
  else{
    jQuery('#tracking-content').attr('src', url+sale);
    onTrackingContentLoaded(sale);
  }

  if (msgError){
    jQuery('.error-label').html(msgError).fadeIn();
    setTimeout(function() {
      jQuery('.error-label').fadeOut('slow');
    }, 3000);
  }

  jQuery('#sale').removeAttr("disabled");
}

function onTrackingContentLoaded(sale){
  jQuery('.main-top').fadeOut(1000);
  jQuery('.tracking-input-group').addClass('input-animated').animate({top: '-14px'}, 1000);
  jQuery('.iframe-holder').fadeIn();

  if (window.history.replaceState) {
    window.history.replaceState("Sale", sale, location.pathname + '?sale=' + sale);
  }
}
