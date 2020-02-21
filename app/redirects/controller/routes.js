module.exports = class Routes {

  constructor(app){
    this.app = app;
    this.cache = {};
  }

  _printMemoryUsed(){
    const used = process.memoryUsage().heapUsed / 1024 / 1024;
    console.log(`Memory Usage: ${Math.round(used * 100) / 100} MB`);
  }

  _setDefaultHeaders(res){
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.setHeader('Cache-Control', 'public, max-age=31557600');
  }

  _setCacheOption(res){
    res.renderAndCache = (path, data) => {
      var cacheId = path + (data ? '-' + Object.values(data).join('-') : '');

      console.time(cacheId);

      if (this.cache[cacheId]){
        res.send(this.cache[cacheId]);
        console.timeEnd(cacheId);
        this._printMemoryUsed();
      }else{
        res.render(path, data, (err, html) => {
          this.cache[cacheId] = html;
          res.send(html);
          console.timeEnd(cacheId);
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
