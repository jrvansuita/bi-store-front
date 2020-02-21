module.exports = {
  path: (name)=>{
    return (global.host ? global.host : '') +  "/img/" + name + ".png";
  }
};
