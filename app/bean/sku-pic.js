const pageLimit = 16;

module.exports = class SkuPic extends DataAccess {

  static getKey() {
    return ['_id'];
  }

  static getPageQuery(sku, not){
    var result = {approved: true};

    if (sku){
      var reg =  new RegExp(sku, 'i');
      if (not){
        result['sku'] = {$not: reg}
      }else{
        result['sku'] = reg;
      }
    }

    return result;
  }




  static getSkuPage(page, sku, callback) {
    var limit = 16;
    var result;

    SkuPic.paginate(SkuPic.getPageQuery(sku), page, '-date', limit, (err, docs)=>{
      var dif = limit - docs.length;
      result = docs;



      if (dif <= 0){
        callback(result);
      }else{
        SkuPic.getLasts(SkuPic.getPageQuery(sku, true), dif, (err, docs) => {
          docs = docs ? docs : [];
          callback(result.concat(docs.sort(function() {
            return .5 - Math.random();
          })));
        });
      }
    });
  }


};
