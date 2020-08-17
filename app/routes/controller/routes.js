const Request = require('../../request/request.js');
const CacheHelper = require('./cache.js');

module.exports = class Routes {
  constructor(app) {
    this.app = app;
  }

  _setDefaultHeaders(res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.setHeader('Cache-Control', 'public, max-age=31557600');
  }

  _setCacheOption(res) {
    res.renderAndCache = (url, params) => {
      new CacheHelper(url, params)
        .load(callback => {
          res.render(url, params, callback);
        })
        .dispatch(content => {
          res.send(content);
        });
    };

    res.redirectAndCache = url => {
      new CacheHelper(url, null)
        .load(callback => {
          this._externalLoad(url, callback);
        })
        .dispatch(content => {
          res.send(content);
        });
    };
  }

  _externalLoad(url, callback) {
    new Request()
      .url(url)
      .success(data => {
        callback(null, data);
      })
      .error(error => {
        callback(error);
      })
      .get();
  }

  _routes() {
    return this.app._router.stack;
  }

  _get(paths, callback) {
    this.app.get(paths, (req, res) => {
      this._setDefaultHeaders(res);
      this._setCacheOption(res);
      callback(req, res);
    });
  }

  _post(paths, callback) {
    this.app.post(paths, (req, res) => {
      callback(req, res);
    });
  }
};
