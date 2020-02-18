module.exports = class Params extends DataAccess {

  constructor() {
    super();
    this.id = 1;
  }

  static getKey() {
    return ['id'];
  }




};
