module.exports = class Routes {

  constructor(app){
    this.app = app;
    this.cache = {};
  }

  _setDefaultHeaders(res){
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.setHeader('Cache-Control', 'public, max-age=31557600');
  }

  _setCacheOption(res){
    res.renderAndCache = (path) => {
      if (this.cache[path]){
        res.send(this.cache[path]);
      }else{
        res.render(path, (err, html) => {
          this.cache[path] = html;
          res.send(html);
        });
      }
    }
  }

  _routes(){
    return this.app._router.stack;
  }

  _get(paths, callback){
    this.app.get(paths, (req, res) => {
      this._setDefaultHeaders(res);
      this._setCacheOption(res);
      callback(req, res);
    });
  }

  _post(paths, callback){
    this.app.post(paths, (req, res) => {
      callback(req, res);
    });
  }
};
