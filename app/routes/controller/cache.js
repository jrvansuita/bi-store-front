var staticData = {};

module.exports = class CacheHelper {
  constructor(path, params) {
    this.id = path + (params ? '-' + Object.values(params).join('-') : '');
    console.time(this.id);
  }

  has() {
    return staticData[this.id] != undefined;
  }

  get() {
    console.timeEnd(this.id);
    Util.printUsedMemory();
    return staticData[this.id];
  }

  put(content) {
    staticData[this.id] = content;
    return content;
  }

  load(onLoadContent) {
    this.onLoadContent = onLoadContent;
    return this;
  }

  dispatch(callback) {
    if (this.has()) {
      callback(this.get());
    } else {
      this.onLoadContent((err, content) => {
        console.timeEnd(this.id);

        if (err) {
          console.log(err);
        } else if (process.env.NODE_ENV) {
          this.put(content);
        }

        callback(content || err.toString());
      });
    }
  }
};
