const https = require('https');

module.exports = class Request{

  constructor(log){
    this._log = log;
  }

  url(url){
    this._url = new URL(url);
    return this;
  }

  success(callback){
    this._onSuccess = callback;
    return this;
  }

  error(callback){
    this._onError = callback;
    return this;
  }

  get(){
    this._method = 'GET';
    this._make();
  }

  post(){
    this._method = 'POST';
    this._make();
  }

  body(body){
   this._body = body;
   return this;
  }

  _getOptions(){
    var options = {
      host: this._url.host,
      port: 443,
      timeout: 60000, // 1 minutos
      path: this._url.pathname + this._url.search,
      method: this._method,
      url: this._url.toString(),
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      }
    };

    if (this._log){
      console.log(options);
    }

    return options;
  }

  _make(){
    var req = https.request(this._getOptions(), (res)=>{
      var data = '';
      res.on('data', (chunk)=>{
        data += chunk;
      });

      res.on('end', ()=>{
        if (this._onSuccess){
          this._onSuccess(data);
        }
      });
    });

    req.on('error', (e)=>{
      console.log(e);
      if (this._onError){
        this._onError(e);
      }
    });

    if (this._body){
      req.write(JSON.stringify(this._body));
    }

    req.end();
  }







}
