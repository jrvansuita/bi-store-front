const fs = require('fs');

module.exports = {
  css: (cssName)=>{
    return "<style>" + fs.readFileSync('./css/int/'+cssName+'.css','utf8') + "</style>";
  },

  js: (jsName)=>{
    return "<script type='text/javascript'>" + fs.readFileSync('./js/int/'+jsName+'.js','utf8') + "</script>";
  },

  jQuery(){
    var result = '';

    if (!process.env.NODE_ENV){
      result = "<script src='/js/ext/jquery.js'></script>"
    }

    return result + "<script>$ = jQuery;</script>";
  }

};
