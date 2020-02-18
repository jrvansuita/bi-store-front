

var Params = {

  isRunningOnServer(){
    return typeof global !== 'undefined';
  },

  bundle(){
    return this.isRunningOnServer() ? global._mainParams : _params;
  },

  get(name){
    return this.bundle()[name];
  },


  facebookUrl(){
    return this.get('fb-url');
  },

  facebookMessengerUrl(){
    return this.get('fb-messenger-url');
  },

  instagramUrl(){
    return this.get('insta-url');
  },

  whatsappUrl(){
    return this.get('whatsapp-url');
  },

  telegramUrl(){
    return this.get('telegram-url');
  },

  customerServiceUrl(){
    return this.get('customer-service-url');
  },

  customerServicePhone(){
    var s = this.get('customer-service-phones').split(',');

    return s[0].trim();
  },

  customerServiceEmail(){
    return this.get('customer-service-email');
  },




}




if (typeof module != 'undefined')
module.exports = Params;
