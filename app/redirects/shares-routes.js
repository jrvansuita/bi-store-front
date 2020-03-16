const Routes = require('../redirects/controller/routes.js');
const ProductSharesProvider = require('../provider/product-shares.js');

var cacheSkuPictures = {};

module.exports = class SharesRoutes extends Routes {

  attach(){
    this._get('/shares-product-widget', (req, res) => {
      res.renderAndCache('shares/products-widget', {sku: req.query.sku, limit: req.query.limit});
    });

    this._post('/get-shares-product-page', (req, res) => {
      new ProductSharesProvider(true)
      .with(req.body.sku, parseInt(req.body.page) || 1, parseInt(req.body.limit))
      .setOnResult((data) => {
        res.send(data);
      })
      .get();
    });
  }


}
