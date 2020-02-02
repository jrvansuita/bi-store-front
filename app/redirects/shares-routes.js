const Routes = require('../redirects/controller/routes.js');
const ProductSharesProvider = require('../provider/product-shares.js');

var cacheSkuPictures = {};

module.exports = class SharesRoutes extends Routes {

  attach(){
    this._get('/shares-product-widget', (req, res) => {
      res.render('shares/products-widget', {sku: req.query.sku});
    });

    this._post('/get-sku-pictures-page', (req, res) => {
      var page = parseInt(req.body.page) || 1;
      var sku = req.body.sku;

      new ProductSharesProvider(true)
      .with(sku, page)
      .setOnResult((data) => {
        res.send(data);
      })
      .get();
    });
  }


}
