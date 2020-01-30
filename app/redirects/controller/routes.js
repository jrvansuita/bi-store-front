
module.exports = class Routes {

  constructor(app){
    this.app = app;
  }

  _get(paths, callback){
    this.app.get(paths, (req, res) => {
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
      callback(req, res);
    });
  }


  _post(paths, callback){
    this.app.post(paths, (req, res) => {
      callback(req, res);
    });
  }
};
