
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

  static getPage(sku, page, limit, callback) {
    var result;

    SkuPic.paginate(SkuPic.getPageQuery(sku), page, '-date', limit, (err, docs)=>{
      var dif = limit - docs.length;
      result = docs;


      if (dif <= 0 || !sku){
        callback(result);
      }else{
        SkuPic.getLasts(SkuPic.getPageQuery(sku, true), page, dif, (err, docs) => {
          docs = docs ? docs : [];
          callback(result.concat(docs.sort(function() {
            return .5 - Math.random();
          })));
        });
      }
    });
  }


};
