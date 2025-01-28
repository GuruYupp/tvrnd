import { IntroTemplate } from "./uitemplates/intro/Introtemplate";
import { productstemplate } from "./uitemplates/products/productstemplate";
import { screenstemplate } from "./uitemplates/screenspage/screenstemplate";

export class Util {
  #PageData;
  #appContainer = $('#appContainer');

  constructor() {
    this.className = 'Util';  
  }

  set PageData(PageData) {
    this.#PageData = PageData;
  }

  get PageData() {
    return this.#PageData;
  }

  renderProducts() {
    // console.log(productstemplate(this.#PageData.data.products))
    $(this.#appContainer).html(productstemplate(this.#PageData.data.products))
  }

  renderIntro(){
    $(this.#appContainer).html(IntroTemplate())
  }

  renderScreensPage(){
    $(this.#appContainer).html(screenstemplate(this.#PageData.data.screensdata))
  }
}
