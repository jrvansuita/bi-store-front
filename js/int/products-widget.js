class ProductShareWidget{
  constructor(sku,  limit){
    this.page = 0;
    this.sku = sku;
    this.limit = limit;
  }

  buildItem(each){
    var item = jQuery('<div>').addClass('item').append(jQuery('<img>').attr('src', each.img));
    if (each.url){
      item.click(() => {window.open(each.url, '_blank')});
    }
    jQuery('.scu-grid').append(item);
    item.hide().fadeIn(200);
  }

  loadNext(){
    this.page++;

    jQuery.post('__host/get-shares-product-page', {sku: this.sku, page: this.page, limit: this.limit}, (data) => {
      if(data && data.length){
        if(this.page == 1)
        this.onFirstPageLoad();

        data.forEach((each)=>{
          this.buildItem(each);
        });
      }else{
        jQuery('.scu-load-more button').hide();
      }
    });
  }

  onFirstPageLoad(){
    jQuery('.scu-grid').before(jQuery('<h2>').addClass('scu-title').append('Fotos Compartilhadas pelos Clientes'));
    var button = jQuery('<button>').text('Carregar Mais');
    var loadHolder = jQuery("<div>").addClass("scu-load-more").append(button);
    jQuery('.scu-holder').append(loadHolder);

    button.click(() => {
      this.loadNext();
    })
  }
};


jQuery(document).ready(() => {
  new ProductShareWidget('__sku','__limit').loadNext();
});
