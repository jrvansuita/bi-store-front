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
  }else if(parseInt(sale.slice(0,3)) < 120 || (sale.length < 9)){
    msgError = "O número do pedido está incorreto"
  }
  else{
    
    getTrackingData(sale, (data) => {

       loadTrackingSale(data)
      //window.data = data
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
  jQuery('.iframe-holder').fadeIn(1000);

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
  var item = data.dados
  console.log(item);

  if(item.historico[0].dataHora == "-"){
    jQuery('.tracking-content').empty().text('Sem informação de rastreio.' + ' ' + item.historico[0].status).css({'color':'#ff6e72', 'whiteSpace':'break-spaces'})
  }else{
  
  var $span = jQuery('<span>').text('Envio')
  var oC = jQuery('<label>').text('Pedido:' + ' ' + item.numero_documento).addClass('oc')
  jQuery('.details-info').empty().append($span, oC)

  var $imgTransp = jQuery('<img>').attr('src','img/transporte/' + item.nome_transportador + '.png')
  jQuery('.transpImg').empty().append( $imgTransp)

  
  var lastStatus = item.ultima_atualizacao_status.split('-')

  setSaleStatus(lastStatus, item);
  buildHistoric(jQuery('.tb-holder'), item)

  var $destino = jQuery('<label>').text(item.destino).addClass('giftDestiny')
  jQuery('.para').append($destino, '<br>')
}
}

function buildHistoric(holder, historic){
  historic.historico.forEach((each) => {
    var $tr = jQuery('<tr>').addClass('lineT')
    var $hora = jQuery('<td>').text(each.dataHora)
    var $status = jQuery('<td>').text(each.status.replace(RegExp('^[0-9]*'), '').replace("-", '').trim().toUpperCase()).css('color','#59C67E')

    var wrong = [64, 6, 26, 21, 40, 184, 185, 25, 182, 46, 60, 41, 40, 29, 32, 77]
    var danmagge = [167, 28, 25, 20, 31]

    if(wrong?.find((filter) => {return filter == each?.status?.split('-')[0]})){
      $status.css('color','#fec76c')
    }
    if(danmagge?.find((filter) => {return filter == each?.status?.split('-')[0]  })){
      $status.css('color','#FF6060')
    }
  
    var $obs = jQuery('<p>').text(each.observacao.replace("-", '')).addClass('obsTd').css('display','none')
    
    if(jQuery($obs).text()){
     var maisInfo = jQuery('<img>').attr('src', 'img/transporte/arrow-right.png')
    }
    var $detalhes = jQuery('<td>').append(maisInfo).addClass('detailsPlus')
    
     
    jQuery($detalhes).click(function(){
      if(jQuery($obs).css('display') == 'none' && jQuery($obs).text()){
        maisInfo?.attr('src','img/transporte/arrow-down.png').addClass('showMore')
        jQuery(this).removeClass('transDown')
        jQuery(this).parent().removeClass('moveOut')
        jQuery(this).append($obs.fadeIn(1000)).addClass('transUp').parent().addClass('moveIn')
      }else{
       maisInfo?.attr('src','img/transporte/arrow-right.png')
       $obs.hide() 
       jQuery(this).removeClass('transUp')
       jQuery(this).parent().removeClass('moveIn')
       jQuery(this).addClass('transDown').parent().addClass('moveOut')
      }
    })
    
    holder.append($tr.append($hora, $status, $detalhes))
   })
}

function setSaleStatus(status, item){
  var imgStatus = jQuery('<img>')
  var textoStatus = jQuery('<span>').text(item.ultima_atualizacao_status.replace(RegExp('^[0-9]*'), '').replace("-", ''))

  var transit = [104, 0, 99, 98, 108, 95, 52, 158, 196,12]
  var exit = [100, 101, 19, 102]
  var wrong = [64, 6, 26, 21, 40, 184, 185, 25, 182, 46, 60, 41, 40, 29, 32, 77]
  var entregue = [1, 49, 35]
  var danmagge = [167, 28, 25, 20, 31]
 
  if(status[0] == 106){
    jQuery('.created').addClass('nowStatus')
    imgStatus.attr('src', 'img/transporte/checked.svg')
  }
  
  if(status[0] == 107){
    jQuery('.dispatched').addClass('nowStatus')
    imgStatus.attr('src', 'img/transporte/send.svg')
  }

  if(transit.find((filter) => {return filter == status[0]})){
    imgStatus.attr('src', 'img/transporte/time.svg')
    jQuery('.inTransit').addClass('nowStatus')
  }
  
  if(exit.find((filter) => { return filter == status[0]})){
    jQuery('.exited').addClass('nowStatus')
    imgStatus.attr('src', 'img/transporte/frete.svg')
  }

  if(entregue.find((filter) => {return filter == status[0]})){
    jQuery('.delivered').addClass('nowStatus').css('background','#59C67E')
    imgStatus.attr('src','img/transporte/gift-green.svg')
  }

  if(wrong.find((filter) => {return filter == status[0]})){
    jQuery('.inTransit').addClass('nowStatus').css('background','#FEC76C')
    imgStatus.attr('src', 'img/transporte/wrong.svg')
    textoStatus.css('border-color', '#FEC76C')
  }

  if(danmagge.find((filter) => {return filter == status[0]})){
    jQuery('.inTransit').addClass('nowStatus').css('background','#FF6060')
    imgStatus.attr('src','img/transporte/error.svg')
    textoStatus.css('border-color','#FF6060')
  }
  jQuery('.statusImg').empty().append(imgStatus, textoStatus)
}