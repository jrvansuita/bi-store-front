const Routes = require('../redirects/controller/routes.js');


module.exports = class TrackingRoutes extends Routes {
  attach(){
    this._get('/tracking-page', (req, res) => {
      res.render('tracking/main-tracking-page');
    });

    this._get('/tracking-sale', (req, res) => {
      res.render('tracking/pages/tracking-sale', {__trackingUrl: Params.trackingUrl()});
    });
  }
}
