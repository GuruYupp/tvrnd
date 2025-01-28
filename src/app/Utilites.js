export class Utilites{
    constructor() {
        this.className = 'Utilites';  
      }

      addFocus(id){
        if($(id).length > 0){
          $('.imageFocus').removeClass('imageFocus')
          $(id).addClass('imageFocus');
        }
      }
}
