class FileUploadDialog{
  constructor(){
    this._build();
  }

  _build(){
    this.holder = jQuery('<div>').addClass('fudmb');
    this.modal = jQuery('<div>').addClass('fudm');
    this.holder.append(this.modal);

    var box = jQuery('<div>').addClass('fudb');
    var ico = jQuery('<div>').addClass('fudih').append(jQuery('<img>').attr('src', Def.host + '/img/pic-folder-c.png'));
    var inner = jQuery('<div>').addClass('fudi');
    box.append(ico, inner);
    this.modal.append(box);

    this.maintitle = jQuery('<span>').addClass('fudt');
    this.subTitle = jQuery('<span>').addClass('fudst').text('Clique aqui para selecionar uma foto do seu computador.');
    this.footTitle = jQuery('<span>').addClass('fudft').text('Suporta: *.png, *.jpe, *.jpeg');

    inner.append(this.maintitle, this.subTitle, this.footTitle);
  }

  title(title){
    this.titleStr = title;
    return this;
  }

  _bind(){
    this.maintitle.text(this.titleStr);
    this.holder.click(() => {
      this.holder.fadeOut(200,()=>{
        this.holder.remove();
      });
    });

    this.modal.click((e) => {
      e.stopPropagation();
    });
  }

  show(){
    this._bind();

    jQuery('body').append(this.holder);
    this.holder.fadeIn('slow');
  }
}
