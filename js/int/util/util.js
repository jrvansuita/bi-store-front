var Util = class{

  constructor(){}

  deviceIsDesktop(){
    if(window.innerWidth > 768)
      return true;
    return false;
  }
}
