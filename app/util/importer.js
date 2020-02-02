var Imp = {

  css: (cssName)=>{
    return "<link rel='stylesheet' type='text/css' href='" + global.host + "/css/int/" + cssName + ".css'>";
  },

  js: (jsName)=>{
    return "<script type='text/javascript' src='" + global.host + "/js/int/" + jsName + ".js'></script>";
  },

  jQuery(){
    return "<script>window.jQuery || document.write('<script src=\""+ global.host + "/js/ext/jquery.js\"><\\/script>')</script><script>$ = jQuery;</script>";
  }

};


if (typeof module != 'undefined')
module.exports = Imp;
