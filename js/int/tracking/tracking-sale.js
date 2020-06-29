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



function loadTrackingContent(){
  jQuery('#sale').attr("disabled", "disabled");

  var sale = jQuery('#sale').val();
  var msgError = "";

  if(sale == ""){
    msgError = "Insira o número do pedido"
  }else if(parseInt(sale.slice(0,3)) < 120 || sale.length < 9){
    msgError = "O número do pedido está incorreto"
  }
  else{
    getTrackingData(sale, (data) => {
      loadTrackingSale(data)
      onTrackingContentLoaded(sale);  
    })
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

function getTrackingData(sale, callback){
  jQuery.post(Def.params.trackingUrl.replace('__sale__', sale), null , (data) => {
    callback(data)
  });
}

function loadTrackingSale(data){
  //Carregar tudo dinamicamente dentro do .tracking-content
  console.log(data);  


  
}