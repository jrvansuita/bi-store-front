module.exports = {
  path: (name)=>{
    return (global.host || '') + "/img/" + name + ".png";
  },

  svg: (name) => {
    return (global.host || '') + "/img/" + name + ".svg";
  }
};
