var Imp = {

  css: (cssName)=>{
    return "<link rel='stylesheet' type='text/css' href='/css/int/" + cssName + ".css'>";
  },

  js: (jsName)=>{
    return "<script type='text/javascript' src='/js/int/" + jsName + ".js'></script>";
  },

  jQuery(){
    return "<script>window.jQuery || document.write('<script src=\"/js/ext/jquery.js\"><\\/script>')</script><script>$ = jQuery;</script>";
  }

};


if (typeof module != 'undefined')
module.exports = Imp;
