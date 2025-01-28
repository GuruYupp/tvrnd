import apiService from "./apis/apiservice";
import { PRODUCTS_ENDPOINT } from "./apis/endpoints";
import * as PageViews from "./constants/viewconstants";

export class Main {
  #Util;
  #PageData;
  #Utilites;

  constructor() {
    this.className = 'Main';  
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

  startApp() {
    // apiService
    //   .GET(PRODUCTS_ENDPOINT)
    //   .then((response) => {
    //     if(response.products.length > 0){
    //       console.log(this.#PageData)
    //       this.#PageData.data.products = response.products;
    //       this.#Util.renderProducts()
    //     }
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
    console.log("Hello")
    this.#PageData.setpagedata({view:PageViews.INTRO_VIEW},{save:false});
    this.changeView(true,{view:PageViews.INTRO_VIEW});
  }

  changeView(isStatic=false,actionDetails={}){
    const {payload} = actionDetails;
    if(isStatic){
      switch(actionDetails?.view){
        case PageViews.INTRO_VIEW:
          this.#Util.renderIntro();
          break;
        case PageViews.SCREENS_VIEW:
          if(payload){
            this.#PageData.setpagedata({view:PageViews.SCREENS_VIEW,screensdata:payload})
            this.#Util.renderScreensPage();
            this.#Utilites.addFocus('#screen-0')
          }
          break;
        default:
          break;
      }
    }
    else{

    }
  }

  previousPage(){
    this.PageData.previous();
  }
}
