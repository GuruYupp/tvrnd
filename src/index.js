import './styles.css';
import './styles.scss';

console.log('Webpack setup is working!');
console.log('SCSS with Webpack is working!');

const delay = ()=>new Promise((resolve,reject)=>{
    setTimeout(()=>{
        resolve("Hosting By Netlify")
    },3000)
})

const sum = async ()=>{
    return delay()  
}

const  display = async ()=>{
    let x = await sum()
    console.log(x)
    $('h1').html( "WelCome Guru ..") 
}

display()