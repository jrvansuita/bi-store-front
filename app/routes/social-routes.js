const Routes = require('../routes/controller/routes.js');


module.exports = class SocialRoutes extends Routes {
  attach(){
    this._get('/social-floating-widget', (req, res) => {
      res.renderAndCache('social/social-floating-widget');
    });

    this._get('/facebook-comments-widget', (req, res) => {
      res.render('social/facebook-comments-widget', {fullhref: req.query.fullhref});
    });
  }
}
