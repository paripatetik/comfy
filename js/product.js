import { fetchData } from './functions/fetchData.js';
import {singleUrl} from './main.js';

let prodContainer = document.querySelector('.product__container');
let subheader = document.querySelector('.subheader__container p');


const params = new URLSearchParams(window.location.search);
const id = params.get('id');



const showProduct = async ()=>{
   let data = await fetchData(`${singleUrl}?id=${id}`); 
    displayProduct(data);
}
function displayProduct(data){
    let id = data.id;
    let {company, name, price, colors, description: desc} = data.fields;
    let img = data.fields.image[0].url;
    let colorspans = '';
    colors.forEach(color=>{
        let span = `<span style='background-color:${color}'></span>`;
        colorspans+=span;
    });
    subheader.textContent = `Home / Products / ${name}`;
    let item = `<img src='${img}' class="product__img" alt="${name}">
    <div class="product__info">
      <p class="product__name">${name}</p>
      <p class="product__company">${company}</p>
      <p class="product__price">$${price/100}</p>
      <div class="product__colors">${colorspans}</div>
      <p class="product__desc">${desc}</p>
      <div class="product__btns item" data-id="${id}"><button class='add__cart add-cart'>Add to cart</button> <a href="products.html" class="all__btn">all products</a></div>
    </div>`;
    prodContainer.innerHTML = item;

};



showProduct();




