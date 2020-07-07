const Routes = require('../redirects/controller/routes.js');
const https = require('https');

module.exports = class TrackingRoutes extends Routes {
  attach(){
    this._get('/tracking-page', (req, res) => {
      res.render('tracking/main-tracking-page', {sale: req.query.sale});
    });

    this._get('/tracking-sale', (req, res) => {      
      res.render('tracking/pages/tracking-sale', {trackingUrl: Params.trackingUrl(), sale: req.query.sale});
    });

    

  }
}
