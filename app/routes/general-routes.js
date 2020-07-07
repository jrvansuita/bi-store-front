const Routes = require('../routes/controller/routes.js');

module.exports = class GeneralRoutes extends Routes {

  attach(){
    this._get('/', (req, res) => {
      res.redirect('/routes');
    });

    this._get('/routes', (req, res) => {
      res.render('general/routes', {routes: this._routes()});
    });

    this._get('/template-viwer', (req, res) => {
      var url = Params.hawkUrl() + '/templates-viewer?id=' + (req.query.id || '');
      res.redirectAndCache(url)
    });



  }


}
