
module.exports = {
  format: (str, data)=>{
    Object.keys(data).forEach((key)=>{

        str = str.replace(new RegExp(key, 'g'), data[key] ? data[key] : '');
    });

    return str;
  },



};
