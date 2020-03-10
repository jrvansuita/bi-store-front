module.exports = {
  path: (name)=>{
    return (global.host || '') + "/img/" + name + ".png";
  }
};
