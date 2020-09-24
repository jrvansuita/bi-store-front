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

    jQuery('.content').load(Def.host + '/tracking-sale' + (Def.params && Def.params.sale ? '?sale=' + Def.params.sale : ''));
});
