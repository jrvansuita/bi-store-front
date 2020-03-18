const SkuPic = require('../bean/sku-pic.js');

var _cachedSkuPictures= {};

module.exports = class ProductSharesProvider{

  constructor(meansurePerformance){
    this.meansurePerformance = meansurePerformance;
  }

  _getLogTag(){
    return 'product-shares-provider: SKU-' + this.sku + ' LIMIT-' + this.limit + ' PAGE-' + this.page;
  }

  with(sku, page, limit){
    this.sku = sku;
    this.page = page;
    this.limit = limit;
    return this;
  }

  _find(callback){
    SkuPic.getPage(this.sku, this.page, this.limit, (data)=>{
      callback(data);
    });
  }

  _index(){
    return this.sku + this.page + this.limit;
  }

  _hasCached(){
    return this._getCached() != undefined;
  }

  _getCached(){
    return _cachedSkuPictures[this._index()];
  }

  _putOnCache(data){
    _cachedSkuPictures[this._index()] = data;
  }

  setOnResult(callback){
    this.onResult = callback;
    return this;
  }

  _callOnResult(){
    if (this.onResult){
      this.onResult(this._getCached());
    }

    if (this.meansurePerformance){
      console.timeEnd(this._getLogTag());
    }
  }

  get(){
    if (this.meansurePerformance){
      console.time(this._getLogTag());
    }

    if (this._hasCached()){
      this._callOnResult();
    }else{
      this._find((data) => {
        this._putOnCache(data);
        this._callOnResult();
      });
    }
  }

}
