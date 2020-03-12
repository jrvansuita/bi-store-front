
var staticData = {};

module.exports = class CacheHelper{

  constructor(path, params){
    this.id = path + (params ? '-' + Object.values(params).join('-') : '');
    console.time(this.id);
  }

  has(){
    return staticData[this.id] != undefined;
  }

  get(){
    console.timeEnd(this.id);
    Util.printUsedMemory();
    return staticData[this.id]

  }

  put(content){
    staticData[this.id] = content;
    console.timeEnd(this.id);
    return content;
  }

  load(onLoadContent){
    this.onLoadContent = onLoadContent;
    return this;
  }

  dispath(callback){
    if (this.has()){
      callback(this.get());
    }else{
      this.onLoadContent((err, content)=>{
        if (!err){
          this.put(content)
        }
        callback(content);
      });
    }
  }

}
