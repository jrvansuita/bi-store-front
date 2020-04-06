jQuery(document).ready(() => {
  jQuery('body').append(jQuery('<div>').load( Def.host + "/social-floating-widget"));


  new SideMenu(jQuery('.content'))
  .addItem('Rastrear', 'loupe-w',  Def.host + '/tracking-sale')
  .addDivider('Dúvidas Frequentes')
  .addItem('Análise Fiscal', 'check-w',   Def.host + '/template-viwer?id=59127298')
  .addItem('Número do Pedido?', 'box-w',  Def.host + '/template-viwer?id=61668082')
  .addItem('Endereço Insuficiente', 'map-w',  Def.host + '/template-viwer?id=61723810')
  .addItem('Central de Atendimento', 'headset-w',   Def.host + '/template-viwer?id=61773960')
  .build()
  .show();


  jQuery('.content').load( Def.host + '/tracking-sale' + ((Def.params && Def.params.sale) ? '?sale=' + Def.params.sale : ''));
});
