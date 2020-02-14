const Routes = require('../redirects/controller/routes.js');

module.exports = class GeneralRoutes extends Routes {

  attach(){
    this._get('/', (req, res) => {
      res.redirect('/routes');
    });

    this._get('/routes', (req, res) => {
      res.render('general/routes', {routes: this._routes()});
    });

  }


}
