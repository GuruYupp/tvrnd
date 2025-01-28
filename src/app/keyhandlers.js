import { RootKeyDown } from "./keyhandlers/rootkeydown";

export class KeyHandler {
  #Util;
  #PageData;
  #Utilites;
  #Main;

  constructor() {
    this.className = "KeyHandler";
    window.addEventListener("keydown", (function(e){
      RootKeyDown(e, {
        PageData: this.#PageData.data,
        Util: this.#Util,
        Utilites: this.#Utilites,
        Main:this.#Main
      });
    }).bind(this));
  }

  set PageData(PageData) {
    this.#PageData = PageData;
  }

  get PageData() {
    return this.#PageData;
  }

  set Util(Util) {
    this.#Util = Util;
  }

  get Util() {
    return this.#Util;
  }

  set Utilites(Utilites) {
    this.#Utilites = Utilites;
  }

  get Utilites() {
    return this.#Utilites;
  }

  set Main(Main) {
    this.#Main = Main;
  }

  get Main() {
    return this.#Main;
  }
}
