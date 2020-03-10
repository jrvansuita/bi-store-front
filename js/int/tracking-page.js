jQuery(document).ready(() => {
  jQuery('body').append(jQuery('<div>').load("__host/social-floating-widget"));

  new SideMenu()
  .addItem('Rastrear', 'loupe-w')
  .addItem('Análise Fiscal', 'check-w')
  .addItem('Número do Pedido?', 'box-w')
  .addItem('Endereço Insuficiente', 'map-w')
  .addItem('Central de Atendimento', 'headset-w')
  .build();
});
