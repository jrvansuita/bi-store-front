const Routes = require('../redirects/controller/routes.js');

module.exports = class SocialRoutes extends Routes {
  attach(){
    this._get('/social-floating-widget', (req, res) => { 
      res.render('social/social-floating-widget');
    });
  }
}
