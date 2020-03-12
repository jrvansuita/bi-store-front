
module.exports = {
  format: (str, data)=>{
    if (data){
      Object.keys(data).forEach((key)=>{
        str = str.replace(new RegExp(key, 'g'), data[key] ? data[key] : '');
      });
    }

    return str;
  },

  printUsedMemory: ()=>{
    const used = process.memoryUsage().heapUsed / 1024 / 1024;
    console.log(`Memory Usage: ${Math.round(used * 100) / 100} MB`);
  }


};
