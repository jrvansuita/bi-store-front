jQuery(document).ready(() => {
  jQuery('body').append(jQuery('<div>').load("__host/social-floating-widget"));

  new SideMenu(jQuery('.content'))
  .addItem('Rastrear', 'loupe-w', '__host/tracking-sale')
  .addDivider('Dúvidas Frequentes')
  .addItem('Análise Fiscal', 'check-w',  '__templateUrl59127298')
  .addItem('Número do Pedido?', 'box-w', '__templateUrl61668082')
  .addItem('Endereço Insuficiente', 'map-w', '__templateUrl61723810')
  .addItem('Central de Atendimento', 'headset-w',  '__templateUrl61773960')
  .build()
  .show();

  jQuery('.content').load('__host/tracking-sale');

});
