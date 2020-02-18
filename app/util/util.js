
module.exports = {
  format: (str, data)=>{
    if (data){
      Object.keys(data).forEach((key)=>{
        str = str.replace(new RegExp(key, 'g'), data[key] ? data[key] : '');
      });
    }

    return str;
  },



};
