const Routes = require('../routes/controller/routes.js');
const https = require('https');
const Enum = require('../param/enum.js');

module.exports = class TrackingRoutes extends Routes {
  attach() {
    this._get('/tracking-page', (req, res) => {
      res.render('tracking/main-tracking-page', { sale: req.query.sale });
    });

    this._get('/tracking-sale', async (req, res) => {
      res.render('tracking/pages/tracking-sale', {
        trackingUrl: Params.trackingUrl(),
        sale: req.query.sale,
        iconStatus: await Enum.on('ICON-STATUS-TRACKING').get(true),
      });
    });

    this._get('/tracking', (req, res) => {
      if (!req.query.sale) {
        return res.status(400).send({
          message: 'No sale number informed!',
        });
      }

      var url = Params.hawkUrl() + '/shipping-order/tracking?sale=' + (req.query.sale || '');
      res.redirectAndCache(url);
    });
  }
};
