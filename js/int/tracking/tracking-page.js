jQuery(document).ready(() => {
  jQuery('body').append(jQuery('<div>').load(Def.host + '/social-floating-widget'));

  var wSize = window.innerWidth;

  var show = wSize > 768 ? true : false;

  new SideMenu(jQuery('.content'))
    .addItem('Rastrear', 'loupe-w', Def.host + '/tracking-sale')
    .addDivider('Dúvidas Frequentes')
    .addItem('Análise Fiscal', 'check-w', Def.host + '/template-viewer?id=59127298')
    .addItem('Número do Pedido?', 'box-w', Def.host + '/template-viewer?id=61668082')
    .addItem('Endereço Insuficiente', 'map-w', Def.host + '/template-viewer?id=61723810')
    .addItem('Central de Atendimento', 'headset-w', Def.host + '/template-viewer?id=61773960')
    .addItem('Perguntas Frequentes', 'question', Def.host + '/faq')
    .build()
    .open(show);

    var url;
    if(Def.params && Def.params.sale){
      url = Def.host + '/tracking-sale?sale=' + Def.params.sale;
    }
    else if(Def.params && Def.params.page){
      url = Def.host + '/' + Def.params.page;
    }
    else{
      url = Def.host + '/tracking-sale';
    }

  jQuery('.content').load(url);
});
