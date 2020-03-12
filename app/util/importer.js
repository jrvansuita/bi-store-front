const fs = require('fs');

module.exports = {
  css: (cssName)=>{
    return "<style>" + fs.readFileSync('./css/int/'+cssName+'.css','utf8') + "</style>";
  },

  js: (jsName, data)=>{
    var result = "<script type='text/javascript'>" + fs.readFileSync('./js/int/'+jsName+'.js','utf8') + "</script>";
    return Util.format(result, data);
  },


  template: (id)=>{
    return Params.hawkUrl() + '/templates-viewer?id=' + (id || '');
  },

  viewport: () => {
    return '<meta name="viewport" content="width=device-width, initial-scale=1.0">';
  },


  jQuery(force){
    var result = '';

    if (force || !process.env.NODE_ENV){
      result = "<script src='/js/ext/jquery.js'></script>"
    }

    return result;
  }

};
