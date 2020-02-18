module.exports = class Initializer{

  constructor(appPath){
    global.__appDir = appPath;
  }

  begin(){
    this.enviromentVariables();
    this.mongoose();

    this.loadParams(() => {
      this.utilities();
      this.expressServer();
    });
  }

  enviromentVariables(){
    if (!process.env.NODE_ENV) {
      require('dotenv').config();
    }
  }

  mongoose(){
    require('../mongoose/mongoose.js');
  }

  loadParams(callback){
    require('../bean/params.js').findAll(function(err, docs) {
      global._mainParams = docs[0].toObject();
      global.Params = require('../param/get.js');
      callback();
    });
  }


  utilities(){
    global.Util = require('../util/util.js');
    global.Imp = require('../util/importer.js');
  }

  expressServer(){
    require('../server/express-runner.js');
    require('../server/express-controls.js');
  }
}
