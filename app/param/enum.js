const Request = require('../request/request.js');

module.exports = class Enum {
  constructor(tag) {
    this.tag = tag;
  }

  static on(tag) {
    return new Enum(tag);
  }

  async get(mapped) {
    return new Promise((resolve, reject) => {
      var url = Params.hawkUrl() + '/api/enum?tag=' + this.tag + '&keys=' + !!mapped;

      new Request(true)
        .url(url)
        .hawkApi()
        .success((data) => {
          resolve(data);
        })
        .error((error) => {
          reject(error);
        })
        .get();
    });
  }
};
