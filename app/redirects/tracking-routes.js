const Routes = require('../redirects/controller/routes.js');
const fs = require('fs');

module.exports = class TrackingRoutes extends Routes {
  attach(){
    this._get('/tracking-page', (req, res) => {
      res.render('tracking/main-tracking-page');
    });

    this._get('/tracking-sale', (req, res) => {
      res.render('tracking/pages/tracking-sale', {__trackingUrl: Params.trackingUrl()});
    });

    this._get('/tracking-template', (req, res) => {
      //teste      http://localhost:4000/tracking-template?id=61723810
      var url = Params.hawkUrl() + '/templates-viewer?id=' + (req.query.id || '');




      fs.readFile(url, function (err, html) {
        console.log(err);
        console.log(html);
        res.send(html);
      });




      //res.renderAndCache('tracking/pages/tracking-sale', {__trackingUrl: Params.trackingUrl()});
    });
  }
}
