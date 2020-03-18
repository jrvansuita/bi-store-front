class ProductShareWidget{
  constructor(sku, limit){
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

    jQuery.post(Def.host + '/get-shares-product-page', {sku: this.sku, page: this.page, limit: this.limit}, (data) => {
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

  addUploadButton(add){
    this.putUploadButton = add;
    return this;
  }

  _uploadFileButtonCreate(){
    var label = jQuery('<span>').addClass('scu-ll').text('Compartilhe Também!');
    var button = jQuery('<span>').addClass('scu-fub').append(label, jQuery('<img>').addClass('scu-fu').attr('src', Def.host + '/img/pic-folder-c.png'));

    button.click(() => {
      new Importer('FileUploadDialog').css('util/file-upload-dialog').font('Varela Round').js('util/file-upload-dialog').get(() => {
        new FileUploadDialog().title('Compartilhe conosco os looks Boutique Infantil!').onSelect((data) => {

          jQuery.ajax({
            type: 'POST',
            url: Def.host + '/post-share-product',
            crossDomain: true,
            data: {
              sku: this.sku,
              img: data
            },
            success: function(responseData, textStatus, jqXHR) {
              console.log(responseData);
            },
            error: function (responseData, textStatus, errorThrown) {
              console.log(responseData);
            }
          });
        }).show();
      });
    });

    return button;
  }

  onFirstPageLoad(){
    var title = jQuery('<h2>').addClass('scu-title').append('Fotos Compartilhadas pelos Clientes');

    if (this.putUploadButton){
      title.append(this._uploadFileButtonCreate());
    }

    jQuery('.scu-grid').before(title);
    var button = jQuery('<button>').text('Carregar Mais');
    var loadHolder = jQuery("<div>").addClass("scu-load-more").append(button);
    jQuery('.scu-holder').append(loadHolder);

    button.click(() => {
      this.loadNext();
    })
  }
};


jQuery(document).ready(() => {
  new ProductShareWidget(Def.params.sku, Def.params.limit).addUploadButton(true).loadNext();
});
