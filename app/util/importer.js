const fs = require('fs');

module.exports = class Importer{

  constructor(params){
    this.result = '';
    this.default(params);
  }

  default(params){
    var def = {host : global.host || ''};

    if (params){
      delete params.settings;
      def.params = params;
    }

    this.result += '<script>window.Def = '+ JSON.stringify(def) + '</script>'
    return this;
  }

  viewport(){
    this.result += '<meta name="viewport" content="width=device-width, initial-scale=1.0">';
    return this;
  }

  jQuery(force){
    if (force || !process.env.NODE_ENV){
      this.result += "<script src='/js/ext/jquery.js'></script>"
    }

    return this;
  }

  frontImporter(){
    return this.js('util/file-importer');
  }

  css(cssName){
    this.result += "<style>" + fs.readFileSync('./css/int/'+cssName+'.css','utf8') + "</style>"
    return this;
  }

  js(jsName){
    this.result += "<script type='text/javascript'>" + fs.readFileSync('./js/int/'+jsName+'.js','utf8') + "</script>";
    return this;
  }

  both(name){
    return this.css(name).js(name);
  }

  font(name){
    this.result += "<link href='https://fonts.googleapis.com/css?family="+name.split(' ').join('+')+"&display=swap' rel='stylesheet'>";
    return this;
  }

  get(){
    return this.result;
  }

};
