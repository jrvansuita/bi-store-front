const Routes = require('../redirects/controller/routes.js');
const ProductSharesProvider = require('../provider/product-shares.js');
const Request = require('../request/request.js');

var cacheSkuPictures = {};

module.exports = class SharesRoutes extends Routes {

  attach(){
    this._get('/shares-product-widget', (req, res) => {
      res.renderAndCache('shares/products-widget', {sku: req.query.sku, limit: req.query.limit});
    });

    this._post('/get-shares-product-page', (req, res) => {
      new ProductSharesProvider(true)
      .with(req.body.sku, parseInt(req.body.page) || 1, parseInt(req.body.limit) || 16)
      .setOnResult((data) => {
        res.send(data);
      })
      .get();
    });


    this._post('/post-share-product', (req, res) => {
      var url = Params.hawkUrl() + '/share-picture-data';

      res.setHeader("Access-Control-Allow-Origin", "*");
      res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
      

      new Request()
      .url(url)
      .body({sku: req.body.sku, base64: req.body.img})
      .success((data) => {
        res.sendStatus(200);
      }).error((error) => {
        console.log(error);
      }).post();
    });


  }


}
