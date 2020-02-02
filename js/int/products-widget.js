
class ProductShareWidget{
  constructor(host, sku){
    this.page = 0;
    this.host = host;
    this.sku = sku || '';
  }

  buildItem(each){
    var item = $('<div>').addClass('item').append($('<img>').attr('src', each.img));
    if (each.url){
      item.click(() => {window.open(each.url, '_blank')});
    }
    $('.scu-grid').append(item);
    item.hide().fadeIn(200);
  }

  loadNext(){
    this.page++;

    $.post(this.host + "/get-sku-pictures-page", {sku: this.sku, page: this.page}, (data) => {
      if(data && data.length){
        if(this.page == 1)
        this.onFirstPageLoad();

        data.forEach((each)=>{
          this.buildItem(each);
        });
      }
    });
  }

  onFirstPageLoad(){
    $('.scu-grid').before($('<h2>').append('Fotos Compartilhadas pelos Clientes'));
    var button = $('<button>').text('Carregar Mais');
    var loadHolder = $("<div>").addClass("scu-load-more").append(button);
    $('.scu-holder').append(loadHolder);

    button.click(() => {
      this.loadNext();
    })
  }

};
