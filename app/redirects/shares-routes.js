const Routes = require('../redirects/controller/routes.js');
const ProductSharesProvider = require('../provider/product-shares.js');
const https = require('https');

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


    this._post('/post-share-product', (req, res) => {
      var url = Params.hawkUrl() + '/upload-base64-img';

      const data = JSON.stringify({
        base64: req.body.img
      });

      const options = {
        hostname: 'hawkproject.herokuapp.com',
        port: 443,
        path: '/upload-base64-img',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': data.length
        }
      };

      req = https.request(options, (res, err, e) => {
        res.on('data', (d) => {
          process.stdout.write(d)
        })
      })

      req.on('error', (error) => {
        console.error(error)
      })

      req.write(data)
      req.end()


    });


  }


}
