import './products.css';


export const productstemplate=(products)=>{
    let Text = ``
    Text += `<div class="productsContainer">`
    products.forEach(element => {
        Text += `<p>${element.title}</p>`
    });
    Text += `</div>`
    return Text;
}