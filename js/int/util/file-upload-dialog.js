class FileUploadDialog{
  constructor(){
    this.holder = $('<div>').addClass('fudmb');
    this.modal = $('<div>').addClass('fudm');
    this.holder.append(this.modal);

    this._build();
  }

  _build(){
    var box = $('<div>').addClass('fudb');
    var ico = $('<div>').addClass('fudih').append($('<img>').attr('src', '__host/img/pic-folder-c.png'));
    var inner = $('<div>').addClass('fudi');
    box.append(ico, inner);
    this.modal.append(box);

    this.maintitle = $('<span>').addClass('fudt');
    this.subTitle = $('<span>').addClass('fudst').text('Clique aqui para selecionar uma foto do seu computador.');
    this.footTitle = $('<span>').addClass('fudft').text('Suporta: *.png, *.jpe, *.jpeg');

    inner.append(this.maintitle, this.subTitle, this.footTitle);
  }

  title(title){
    this.maintitle.text(title);
    return this;
  }

  show(){
    $('body').append(this.holder);
    this.holder.fadeIn(400);
  }

}
