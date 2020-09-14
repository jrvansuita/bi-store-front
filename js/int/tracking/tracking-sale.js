jQuery(document).ready(() => {
  jQuery('#sale').on('keypress', function (e) {
    if (e.which === 13) {
      loadTrackingContent();
    }
  });

  jQuery('#go-sale').click(() => {
    loadTrackingContent();
  });

  if (jQuery('#sale').val()) {
    loadTrackingContent();
  }
});

function loadTrackingContent() {
  jQuery('#sale').attr('disabled', 'disabled');

  var sale = jQuery('#sale').val().trim();
  var msgError = '';

  if (sale == '') {
    msgError = 'Insira o número do pedido';
  } else if (parseInt(sale.slice(0, 3)) < 120 || sale.length < 9) {
    msgError = 'O número do pedido está incorreto';
  } else {
    getTrackingData(sale, data => {
      loadTrackingSale(data);
      onTrackingContentLoaded(sale);
    });
  }

  if (msgError) {
    jQuery('.error-label').html(msgError).fadeIn();
    setTimeout(function () {
      jQuery('.error-label').fadeOut('slow');
    }, 3000);
  }

  jQuery('#sale').removeAttr('disabled');
}

function onTrackingContentLoaded(sale) {
  jQuery('.main-top').fadeOut(1000);
  jQuery('.tracking-input-group').addClass('input-animated').animate({ top: '-14px' }, 1000);
  jQuery('.iframe-holder').fadeIn(1000);

  if (window.history.replaceState) {
    window.history.replaceState('Sale', sale, location.pathname + '?sale=' + sale);
  }
}

function getTrackingData(sale, callback) {
  jQuery.get(Def.host + '/tracking?sale=' + sale, null, data => {
    callback(JSON.parse(data));
  });
}

function loadTrackingSale(data) {
  window.data = data;
  var item = data.tracking;
  var icons = JSON.parse(Def.params.iconStatus);


  jQuery('.error-label').remove();

  if (item.historico[0].dataHora == '-') {
    jQuery('.tracking-content').hide();
    jQuery('.iframe-holder').append(
      jQuery('<span>')
        .addClass('error-label')
        .text('Sem informação de rastreio.' + ' ' + item.historico[0].status)
    );
  } else {
    jQuery('.tracking-content').show();

    var $span = jQuery('<span>').text('Envio');
    var dateBuy = jQuery('<label>').text('Compra: ' + new Date(data.sale.buyDate).toLocaleDateString('pt-BR')).addClass('dates-buy')
    var coletedDay = jQuery('<label>').text('Faturamento: ' + new Date(data.sale.invoiceDate).toLocaleDateString('pt-BR')).addClass('dates-buy invoice')
    var oC = jQuery('<label>')
      .text('Pedido:' + ' ' + item.numero_documento)
      .addClass('dates-buy');
      
    jQuery('.details-info').empty().append($span, oC, dateBuy, coletedDay);

    var $imgTransp = jQuery('<img>').attr('src', data.sale?.icon?.description);

    jQuery('.transpImg').empty().append($imgTransp);

    var lastStatus = item.ultima_atualizacao_status.split('-');

    setSaleStatus(lastStatus, item, icons);
    buildHistoric(jQuery('.tb-holder'), item, icons);

    var $destino = jQuery('<label>').text(item.destino).addClass('giftDestiny');
    jQuery('.para-txt').empty().append($destino, '<br>');

    addressInformation()

    var showedDate = isNaN(new Date(data.sale.deliveryDate).getTime()) ? new Date(data.sale.expectedDate) : data.sale.deliveryDate;
    
    if(data.sale.expectedDate == null || data.sale.expectedDate == "0000-00-00"){
      jQuery('#deliveryDate').text(data.sale.deliveryTime + ' dias úteis');
    }else{
      jQuery('#deliveryDate').text(new Date(showedDate).toLocaleDateString('pt-BR'));
    }
    
  }
}

function buildHistoric(holder, historic, problem) {
  holder.empty();
  var dataHora = jQuery('<th>').text('Data/Hora');
  var historyStatus = jQuery('<th>').text('Status');
  var moreObs = jQuery('<th>').text('Observação');
  var $th = jQuery('<thead>').append(dataHora, historyStatus, moreObs);

  holder.append($th);

  historic.historico.forEach(each => {
    var $tr = jQuery('<tr>').addClass('lineT');
    var $hora = jQuery('<td>').text(each.dataHora);
    var $status = jQuery('<td>')
      .text(each.status.replace(RegExp('^[0-9]*'), '').replace(/-/g, '').trim().toUpperCase())
      .css('color', '#59C67E');

    Object.keys(problem).forEach(e => {
      e.split(',').forEach(keys => {
        if (keys == each.status.split('-')[0].trim() && problem[e].description == 'wrong') {
          $status.css('color', '#fec76c');
          $hora.css('border-color', '#fec76c');
        }
        if (keys == each.status.split('-')[0].trim() && problem[e].description == 'flaw') {
          $status.css('color', '#FF6060');
          $hora.css('border-color', '#ff6060');
        }
      });
    });

    var $obs = jQuery('<p>')
      .text(each.observacao.replace(RegExp('^[0-9]*'), '').replace(/-/g, '')?.replace(/\*/g, ''))
      .addClass('obsTd')
      .css('display', 'none');

    if (jQuery($obs).text()) {
      var maisInfo = jQuery('<img>').attr('src', Def.host + '/img/transporte/arrow-right.png');
    }

    var $detalhes = jQuery('<td>').append(maisInfo).addClass('detailsPlus');

    jQuery($detalhes).click(function () {
      if (jQuery($obs).css('display') == 'none' && jQuery($obs).text()) {
        maisInfo?.attr('src', Def.host + '/img/transporte/arrow-down.png').addClass('showMore');
        jQuery(this).removeClass('transDown');
        jQuery(this).parent().removeClass('moveOut');
        jQuery(this).append($obs.fadeIn(1000)).addClass('transUp').parent().addClass('moveIn');
      } else {
        maisInfo?.attr('src', Def.host + '/img/transporte/arrow-right.png');
        $obs.hide();
        jQuery(this).removeClass('transUp');
        jQuery(this).parent().removeClass('moveIn');
        jQuery(this).addClass('transDown').parent().addClass('moveOut');
      }
    });

    holder.append($tr.append($hora, $status, $detalhes));
  });
}

function setSaleStatus(status, item, icons) {
  cleanTimeline();

  var imgStatus = jQuery('<img>');
  var textoStatus = jQuery('<span>').text(item.ultima_atualizacao_status.replace(RegExp('^[0-9]*'), '').replace(/-/g, ''));
  var actualStatus = parseInt(status[0].trim());

  Object.keys(icons).forEach(keys => {
    keys.split(',').forEach(each => {
      if (each == actualStatus) {
        jQuery('.' + icons[keys].name).addClass(icons[keys].description);
        imgStatus.attr('src', Def.host + '/img/transporte/' + icons[keys].icon + '.svg');
      }
      if (each == actualStatus && icons[keys].description == 'wrong') {
        textoStatus.css('border-color', '#FEC76C');
      }
      if (each == actualStatus && icons[keys].description == 'flaw') {
        textoStatus.css('border-color', '#FF6060');
      }
    });
  });

  jQuery('.statusImg').empty().append(imgStatus, textoStatus);
}

function cleanTimeline() {
  if (jQuery('.now-status').length) jQuery('.now-status').removeClass('now-status');
  if (jQuery('.wrong').length) jQuery('.wrong').removeClass('wrong');
  if (jQuery('.flaw').length) jQuery('.flaw').removeClass('flaw');
  if (jQuery('.now-delivered').length) jQuery('.now-delivered').removeClass('now-delivered');
}

function addressInformation(){
  var address = data.sale.destiny

  var aName = jQuery('<p>').text(address.nome)
  var aStreet = jQuery('<p>').text(address.endereco + ' ' + address.enderecoNro + ', ' + address.complemento)
  var aNeighBor = jQuery('<p>').text(address.bairro)
  var aCity = jQuery('<p>').text(address.cep + ', ' + address.cidade + ' ' + address.uf)
  var dest = jQuery('<h2>').text('Endereço de Destino')

  jQuery('.address').empty().append(dest ,aName, aStreet, aNeighBor, aCity)
}
