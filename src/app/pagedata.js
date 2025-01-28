export class PageData{
    data = {};
    #stack = []
    #appContainer = $('#appContainer');
    
    constructor(){
        this.className = 'PageData'
    }

    persist(){
        this.data.htmlString = this.#appContainer.html();
        this.#stack.push(this.data)
    }

    reset(){
        this.data = {};
    }

    setpagedata(data,options={save:true}){
        if(options.save){
            this.persist();
        }
        this.reset()
        this.data = data;
    }

    previous(){
        if(this.#stack.length > 0){
          this.data = this.#stack.pop();
          this.#appContainer.html(this.data.htmlString)
        }
    }

}