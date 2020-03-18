module.exports = class DataAccess {


  toObject(){
    delete this.__v;
    delete this._id;
    delete this['$setOnInsert'];

    return this;
  }


  // -- Abstract -- //

  //It's an abstract method and has to be implemented on child class
  //Define the attr name of the Primary Key
  static getKey() {
    return ["Not Defined"];
  }

  //Retrive the primary key value from the object provided
  static getKeyVal(object) {
    var keyValues = object.constructor.getKey();

    keyValues.forEach((k, i) => {
      keyValues[i] = object[k];
    });

    //return object[object.constructor.getKey()];

    return keyValues;
  }

  //Builds the query for primary key quering
  static getKeyQuery(values) {

    if (values instanceof Array){
      if (values[0] == undefined) return {};
    }



    var query = {};
    var keys = this.getKey();

    keys.forEach((k, i) => {
      query[k] = values instanceof Array ? values[i] : values;
    });

    return query;
  }



  // --- Static -- //
  //A static acess to child model
  static staticAccess() {
    //Create a new child to pass to schema
    return Schema.Model(new this());
  }

  //Find all elements from current entity
  static findAll(callback) {
    this.find({}, callback);
  }

  //Find one element from current query
  static findOne(query, callback) {
    this.staticAccess().findOne(query, callback);
  }

  //Find any elements that match the query provided
  static find(query, callback) {
    this.staticAccess().find(query, callback);
  }

  //Find any elements that match the query provided
  static findAndSort(query, sortField, callback) {
    this.staticAccess().find(query).sort(sortField).exec(callback);
  }

  //Find any elements that match the query provided
  static findByKey(keyValue, callback) {
    this.staticAccess().findOne(this.getKeyQuery(keyValue), callback);
  }

  static like(keyValue, limit, callback){
    this.staticAccess()
    .find(this.getKeyQuery(new RegExp(keyValue, "i")))
    .limit(limit)
    .exec(callback);
  }


  //Find any elements that match the query provided
  static paginate(query, page, sort, rowsPerPage, callback) {
    page--;//Convert to index;

    rowsPerPage = rowsPerPage || 30;

    this.staticAccess()
    .find(query)
    .sort(sort)
    .skip(page * rowsPerPage)
    .limit(rowsPerPage)
    .exec(callback);
  }

  //Retrive the last stored element
  static getLast(callback) {
    this.staticAccess().findOne().sort({
      field: 'asc',
      _id: -1
    }).limit(1).exec(callback);
  }


  //Retrive the last stored element
  static getLasts(query, page, rowsPerPage, callback) {
    page = page || 1;
    page--;

    rowsPerPage = rowsPerPage || 100;

    this.staticAccess()
    .find(query)
    .sort({
      field: 'asc',
      _id: -1
    })
    .skip(page * rowsPerPage)
    .limit(rowsPerPage)
    .exec(callback);
  }



  static aggregate(query, callback) {
    this.staticAccess().aggregate(query,
      function(err, res) {
        if (callback)
        callback(err, res);
      });
    }



    // --- Class -- //
    //A class access to the class model
    classAccess() {
      //Create a new child to pass to schema
      return Schema.Model(this);
    }


    getPKQuery() {
      return this.constructor.getKeyQuery(this.constructor.getKeyVal(this));
    }





  };
