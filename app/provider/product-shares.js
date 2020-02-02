const SkuPic = require('../bean/sku-pic.js');

var _cachedSkuPictures= {};

module.exports = class ProductSharesProvider{

  constructor(meansurePerformance){
    this.meansurePerformance = meansurePerformance;
  }

  _getLogTag(){
    return 'ProductSharesProvider: SKU-' + this.sku + ' PAGE-' + this.page;
  }

  with(sku, page){
    this.sku = sku;
    this.page = page;
    return this;
  }

  _find(callback){
    SkuPic.getPage(this.sku, this.page, (data)=>{
      callback(data);
    });
  }

  _index(){
    return this.sku + this.page;
  }

  _hasCached(){
    return this._getCached() != undefined;
  }

  _getCached(){
    return _cachedSkuPictures[this._index()];
  }

  _putOnCache(data){
    return _cachedSkuPictures[this._index()] = data;
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
