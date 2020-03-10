jQuery(document).ready(() => {
  jQuery('body').append(jQuery('<div>').load("__host/social-floating-widget"));

  new SideMenu()
  .addItem('Rastrear', 'loupe-w')
  .addItem('Análise Fiscal', 'icon')
  .addItem('Número do Pedido?', 'icon')
  .addItem('Endereço Insuficiente', 'icon')
  .addItem('Central de Atendimento', 'icon')
  .build();
});
