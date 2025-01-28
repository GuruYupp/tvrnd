import './screens.css';

export const screenstemplate = (screensdata)=>{
    let Text = ``
    Text += `<div class="screensPage">`
    Text += `<div class="screensContainer">`
    Object.entries(screensdata).forEach(([key,value],index) => {
        Text += `<div class="screen" id=screen-${index}>${value}</div>`
    });
    Text += `</div>`
    Text += `</div>`
    return Text;
}