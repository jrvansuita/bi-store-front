var Util = class{

  constructor(){}

  deviceIsDesktop(){
    if(window.innerWidth > 1024)
      return true;
    return false;
  }
}
