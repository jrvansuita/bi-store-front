jQuery(document).ready(() => {
  jQuery('body').append(jQuery('<div>').load("__host/social-floating-widget"));

  var show = new Util().deviceIsDesktop();

  new SideMenu(jQuery('.content'))
  .addItem('Rastrear', 'loupe-w', '__host/tracking-sale')
  .addDivider('Dúvidas Frequentes')
  .addItem('Análise Fiscal', 'check-w',  '/template-viwer?id=59127298')
  .addItem('Número do Pedido?', 'box-w', '/template-viwer?id=61668082')
  .addItem('Endereço Insuficiente', 'map-w', '/template-viwer?id=61723810')
  .addItem('Central de Atendimento', 'headset-w',  '/template-viwer?id=61773960')
  .build()
  .show(show);

  jQuery('.content').load('__host/tracking-sale');

});
