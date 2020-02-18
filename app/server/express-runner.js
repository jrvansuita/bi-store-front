var express = require('express');
var bodyParser = require('body-parser');

global.app = express();
var app = global.app;
app.set('port', process.env.PORT || 4000);


app.use(bodyParser.json({limit: '5mb'}));
app.use(bodyParser.urlencoded({
  extended: true,
  limit: '5mb',
  parameterLimit: 1000000
}));

app.set('view engine', 'ejs');
app.set('views', global.__appDir + '/views');
app.listen().setTimeout(120000); // 2 minutos


app.use('/css', express.static('css'));
app.use('/js', express.static('js'));
app.use('/img', express.static('img', {
  maxAge: 2 /*2 dias*/ * (24 * 60 * 60 * 1000) // 24 hours
}));

//CORS middleware
var allowedOrigins = [
  'https://www.boutiqueinfantil.com.br'
];

if (!process.env.NODE_ENV){
  allowedOrigins.push('http://localhost:' + app.get('port'));
}

var allowCorsMiddleware = (req, res, next) => {
  if(allowedOrigins.indexOf(req.headers.origin) > -1){
    res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
  }
  res.header('Access-Control-Allow-Methods', 'GET');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

  next();
};

app.use(allowCorsMiddleware);

if (process.env.NODE_ENV) {
  app.use((req, res, next) => {
    global.host = 'https://' + req.get('host');
    next();
  });
}

process.on('uncaughtException', function (err) {
  console.log(err);
});


var server = app.listen(app.get('port'), function() {
  console.log('Node is running on port ', app.get('port'));
});
