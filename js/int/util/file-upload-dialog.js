class FileUploadDialog{
  constructor(){
    this._build();
  }

  _buildMain(){
    this.close = jQuery('<img>').addClass('fudc').attr('src', Def.host + '/img/x-w.png');

    this.holder = jQuery('<div>').addClass('fudmb');
    this.modal = jQuery('<div>').addClass('fudm').append(this.close);

    this.holder.append(this.modal);
  }

  _buildInputForm(){
    this.form = jQuery('<form>').attr('method','post').attr('action','sdsd').attr('enctype', 'multipart/form-data')
    this.input = jQuery('<input>').attr('type','file').attr('id','upload').attr('accept', '.png,.jpg,.jpeg');
    this.form.append(this.input);
    this.modal.append(this.form);


    this.input.change((e)=>{
      var reader = new FileReader();
      reader.onload = (event)=>{
        this._onFileUploaded(event.target.result);
        if (this.onSelectListener){
          this.onSelectListener(event.target.result.split(',')[1])
        }
      };
      reader.readAsDataURL(e.target.files[0]);
  });

}

_buildTextBox(){
  var box = jQuery('<div>').addClass('fudb');

  this.img = jQuery('<img>').attr('src', Def.host + '/img/pic-folder-c.png').addClass('fudfb');

  var imgHolder = jQuery('<div>').addClass('fudih').append(this.img);

  this.inner = jQuery('<div>').addClass('fudi');

  box.append(imgHolder, this.inner);
  this.modal.append(box);

  this.maintitle = jQuery('<span>').addClass('fudt');
  this.subTitle = jQuery('<span>').addClass('fudst').text('Clique aqui para selecionar uma foto deste produto sendo usado no dia-a-dia.');
  this.footTitle = jQuery('<span>').addClass('fudft').text('Suporta: *.png, *.jpg, *.jpeg');
  this.inner.append(this.maintitle, this.subTitle, this.footTitle);

  box.click((e) => {
    e.stopPropagation();
    this.input.trigger('click');
  });
}

_build(){
  this._buildMain();
  this._buildTextBox();
  this._buildInputForm();
}

title(title){
  this.titleStr = title;
  return this;
}

_onFileUploaded(image){
  this.img.addClass('fudf').attr('src', image);
  this.maintitle.text('Obrigado por compartilhar!');
  this.subTitle.text('Sua foto foi enviada para análise da nossa equipe, caso aprovada, será publicada em breve.');
  this.img.removeClass('fudfb');
  this.footTitle.hide();
}

_bind(){
  this.maintitle.text(this.titleStr);
  this.holder.click(()=>{
    this.close.trigger('click');
  });

  this.close.click((e)=>{
    e.stopPropagation();
    this.holder.fadeOut(200,()=>{
      this.holder.remove();
    });
  });

  this.modal.click((e) => {
    e.stopPropagation();
  });
}

onSelect(onSelect){
  this.onSelectListener = onSelect;
  return this;
}

show(){
  this._bind();

  jQuery('body').append(this.holder);
  this.holder.fadeIn('slow');
}
}
