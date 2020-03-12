const Routes = require('../redirects/controller/routes.js');

module.exports = class GeneralRoutes extends Routes {

  attach(){
    this._get('/', (req, res) => {
      res.redirect('/routes');
    });

    this._get('/routes', (req, res) => {
      res.render('general/routes', {routes: this._routes()});
    });

    this._get('/template-viwer', (req, res) => {
      //teste      http://localhost:4000/template-viwer?id=61723810
      var url = Params.hawkUrl() + '/templates-viewer?id=' + (req.query.id || '');
      res.redirectAndCache(url)
    });


  }


}
