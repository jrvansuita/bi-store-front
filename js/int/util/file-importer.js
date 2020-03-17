window.Importer = class{

  constructor(tag){
    this.tag = tag;

    this.cssArr = [];
    this.fontArr = [];
    this.jsArr = [];
  }

  need(){
    return !window.__tag || !window.__tag[this.tag];
  }

  css(name){
    this.cssArr.push(name);
    return this;
  }

  _loadCss(){
    this.cssArr.forEach((each) => {
      jQuery('<link>').appendTo('head').attr({
        type: 'text/css',
        rel: 'stylesheet',
        href: Def.host + '/css/int/'+each+'.css'
      });
    });
  }

  font(name){
    this.fontArr.push(name);
    return this;
  }

  _loadFont(){
    this.fontArr.forEach((each) => {
      jQuery('<link>').appendTo('head').attr({
        rel: 'stylesheet',
        href: "https://fonts.googleapis.com/css?family="+each.split(' ').join('+')+"&display=swap' rel='stylesheet'>"
      });
    });
  }

  js(name, callback){
    this.jsArr.push(name);
    return this;
  }

  _loadJs(callback){
    var getScripts = function (scripts, callback){
      var progress = 0;
      scripts.forEach(function(s) {
        jQuery.getScript(Def.host + '/js/int/' + s + '.js', function () {
          if (++progress == scripts.length) callback();
        });
      });
    }

    getScripts(this.jsArr, callback);
  }

  _controlTag(){
    window.__tag = window.__tag || {};
    window.__tag[this.tag] = true;
  }

  get(callback){
    if (this.need()){
      this._loadCss();
      this._loadFont();

      this._controlTag();

      if (this.jsArr.length > 0){
        this._loadJs(callback);
      }else{
        callback();
      }
    }else{
      callback();
    }
  }

};
