const https = require('https');
const CacheHelper = require('./cache.js');

module.exports = class Routes {

  constructor(app){
    this.app = app;
  }

  _setDefaultHeaders(res){
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.setHeader('Cache-Control', 'public, max-age=31557600');
  }

  _setCacheOption(res){
    res.renderAndCache = (url, params) => {
      new CacheHelper(url, params).load((callback) => {
        res.render(url, params, callback);
      }).dispath((content) => {
        res.send(content);
      });
    }

    res.redirectAndCache = (url) => {
      new CacheHelper(url, null).load((callback) => {
        this._externalLoad(url, callback);
      }).dispath((content) => {
        res.send(content);
      });
    }
  }


  _externalLoad(url, callback){
    https.get(url, (resp) => {
      let data = '';
      resp.on('data', (chunk) => {
        data += chunk;
      });
      resp.on('end', () => {
        callback(null, data);
      });
    });
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
