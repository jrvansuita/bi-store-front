var app = global.app;
var routes = [];
routes.push('general-routes.js');
routes.push('shares-routes.js');
routes.push('social-routes.js');
routes.push('tracking-routes.js');

// -- Run Routes -- //
routes.forEach((r)=>{
  var Clazz = require('../routes/' + r);
  new Clazz(app).attach();
});
