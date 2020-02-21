const Routes = require('../redirects/controller/routes.js');

module.exports = class SocialRoutes extends Routes {
  attach(){
    this._get('/social-floating-widget', (req, res) => {
      console.time('social-floating-widget');
      res.render('social/social-floating-widget');
      console.timeEnd('social-floating-widget');
    });
  }
}
