const Routes = require('../redirects/controller/routes.js');
const SkuPic = require('../bean/sku-pic.js');

var cacheSkuPictures = {};

module.exports = class SharesRoutes extends Routes {

  attach(){
    this._get('/shares-product-widget', (req, res) => {
      res.render('shares/products-widget', {sku: req.query.sku});
    });

    this._post('/get-sku-pictures-page', (req, res) => {
      var page = parseInt(req.body.page) || 1;
      var sku = req.body.sku;

      var cached = cacheSkuPictures[sku + page];

      if (cached){
        res.send(cached);
      }else{
        SkuPic.getSkuPage(page, sku, (all)=>{
          cacheSkuPictures[sku + page] = all;
          res.send(all);
        });
      }
    });
  }


}
