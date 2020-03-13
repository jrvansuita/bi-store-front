jQuery(document).ready(() => {
  jQuery('body').append(jQuery('<div>').load("__host/social-floating-widget"));

  var show = new Util().deviceIsDesktop();

  new SideMenu(jQuery('.content'))
  .addItem('Rastrear', 'loupe-w', '__host/tracking-sale')
  .addDivider('Dúvidas Frequentes')
  .addItem('Análise Fiscal', 'check-w',  '__host/template-viwer?id=59127298')
  .addItem('Número do Pedido?', 'box-w', '__host/template-viwer?id=61668082')
  .addItem('Endereço Insuficiente', 'map-w', '__host/template-viwer?id=61723810')
  .addItem('Central de Atendimento', 'headset-w',  '__host/template-viwer?id=61773960')
  .build()
  .show(show);

  jQuery('.content').load('__host/tracking-sale');

  console.log('__host');
});
