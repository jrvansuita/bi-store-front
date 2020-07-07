const Routes = require('../routes/controller/routes.js');
const https = require('https');
const Request = require('../request/request.js');

module.exports = class TrackingRoutes extends Routes {
  attach(){
    this._get('/tracking-page', (req, res) => {
      res.render('tracking/main-tracking-page', {sale: req.query.sale});
    });

    this._get('/tracking-sale', (req, res) => {
       console.log('chegou');
       
       new Request(true).url(Params.hawkUrl() + '/api/enum?tag=ICON-STATUS-TRACKING')
       .hawkApi()
       .success((data) => {
        console.log(data);
        
      }).error((error) => {
        console.log(error);
        
      }).get();


      res.render('tracking/pages/tracking-sale', {trackingUrl: Params.trackingUrl(), sale: req.query.sale});
    });


  }
}
