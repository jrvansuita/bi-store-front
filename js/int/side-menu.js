var SideMenu = class {

  constructor(contentLoader){
    this.ul = jQuery('<ul>').addClass('sm-h');
    this.contentLoader = contentLoader;
  }

  _prepareMenu(){
    var b = jQuery('<li>').append(jQuery('<img>').attr('id', 'sm-c').attr('src', '__host/img/left-arrow-w.png'));
    b.click(() => {
      this.hide();
    });
    this.ul.prepend(b);
  }

  addDivider(label){
    var label = jQuery('<p>').append(label);
    var item = jQuery('<li>').addClass('sm-d').append(label);
    this.ul.append(item);
    return this;
  }

  addItem(label, icon, callbackOrUrl){
    var label = jQuery('<p>').append(label);
    var icon = jQuery('<img>').addClass('sm-i').attr('src', '__host/img/' + icon + '.png');
    var item = jQuery('<li>').append(label, icon).click(() => {

      this.hide();

      if (callbackOrUrl){
        if (typeof callbackOrUrl === "function"){
          callback();
        }else if (typeof callbackOrUrl === "string"){
          this.contentLoader.empty();
          this.contentLoader.load(callbackOrUrl);
        }
      }

    });
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
