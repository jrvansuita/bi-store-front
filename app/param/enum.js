const Request = require('../request/request.js');

module.exports = class Enum{

    constructor(tag){
        this.tag = tag;
    }

    static on(tag){
      return new Enum(tag);
    }


   async get(mapped){
       return new Promise((resolve, reject) => {
         new Request().url(Params.hawkUrl() + '/api/enum?tag='+ this.tag + '&keys=' + !!mapped)
    .hawkApi()
    .success((data) => {
        resolve(data);
     
   }).error((error) => {
    reject(error);
     
   }).get();
       });

       
    }


}