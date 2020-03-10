jQuery(document).ready(() => {

  jQuery('#sale').on('keypress', function (e) {
    if(e.which === 13){
      loadTrackingContent();
    }
  });

  jQuery('#go-sale').click(()=>{
    loadTrackingContent();
  });
});



function loadTrackingContent(callback){
  jQuery('#sale').attr("disabled", "disabled");

  var url = '__trackingUrl';
  var sale = jQuery('#sale').val();
  var msgError = "";

  if(sale == ""){
    msgError = "Insira o número do pedido"
  }else if(!sale.startsWith('120') || sale.length < 9 || sale.length > 9){
    msgError = "O número do pedido está incorreto"
  }
  else{
    jQuery('#tracking-content').attr('src', url+sale);
  }

  if (msgError){
    jQuery('.error-label').html(msgError);
    jQuery('.error-label').fadeIn();
  }

  jQuery('#sale').removeAttr("disabled");
}
