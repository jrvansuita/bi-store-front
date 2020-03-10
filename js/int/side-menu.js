var SideMenu = class {

  constructor(){
    this.ul = jQuery('<ul>').addClass('sm-h');
  }

  _prepareMenu(){
    var b = jQuery('<li>').append(jQuery('<img>').attr('id', 'sm-c').attr('src', '__host/img/left-arrow-w.png'));
    b.click(() => {
      this.hide();
    });
    this.ul.prepend(b);
  }

  addItem(label, icon, callback){
    var label = jQuery('<p>').append(label);
    var icon = jQuery('<img>').addClass('sm-i').attr('src', '__host/img/' + icon + '.png');
    var item = jQuery('<li>').append(label, icon);
    this.ul.append(item);

    return this;
  }



  _appendFloatingMenuButton(){
    var menuButton = jQuery('<img>').attr('id', 'sm-o').attr('src', '__host/img/menu-w.png');
    menuButton.click(() => {
      if (this.ul.hasClass('opened')){
        this.hide();
      }else{
        this.show();
      }
    });
    jQuery('body').append(menuButton);
  }


  show(){
    this.ul.addClass('opened').css('transform', 'translateX(0)');
  }

  hide(){
    this.ul.removeClass('opened').css('transform', 'translateX(-100%)');
  }

  build(){
    this._appendFloatingMenuButton();
    this._prepareMenu();
    jQuery('body').append(this.ul);

    return this;
  }




}
