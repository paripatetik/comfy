export const singleUrl = 'https://course-api.com/javascript-store-single-product';

export const allProductsUrl = 'https://course-api.com/javascript-store-products';
// temporary single product
// 'https://course-api.com/javascript-store-single-product?id=rec43w3ipXvP28vog'

let btn = document.querySelector('.btn-toggle');
let menu = document.querySelector('.header__nav');
let btnCart = document.querySelector('.header__buy');
let cartBlock = document.querySelector('.header__cart');
let btnClose = document.querySelector('.close-btn');
let container = document.querySelector('.grid-items');
let wrapper = document.querySelector('.wrapper');
let cartNumber = document.querySelector('.header__buy span');

let storageArr = [];
let cartAmount = 0; 

import { fetchData } from "./functions/fetchData.js";
import { displayItems } from "./functions/displayItems.js";

window.addEventListener("DOMContentLoaded", function(){
    if(!localStorage.length) return;
    storageArr = JSON.parse(localStorage.getItem('cart')); 
    displayCart();
    checkAmout();
});


btn.addEventListener('click', function(e){
    btn.classList.toggle('active');
    menu.classList.toggle('active');
    document.body.classList.toggle('lock');
});

btnCart.addEventListener('click', function(e){
    cartBlock.classList.add('active');
});

btnClose.addEventListener('click', function(e){
    cartBlock.classList.remove('active');
});

wrapper.addEventListener('click', async function(e){
    let old = false; 
    let target = e.target.closest('.add-cart');
    if(!target) return; 

    let id = target.closest('.item').dataset.id;
    //check for local storage - amount ++ 
    storageArr.forEach(elem=>{
        if(elem.id == id){
            old=true;
            elem.amount++;
            localStorage.setItem('cart', JSON.stringify(storageArr));
            displayCart();
        }
    });

   if(!old){
    let data = await fetchData(`${singleUrl}?id=${id}`); 
    let {name, price} = data.fields;
    price= price/100;
    let img = data.fields.image[0].url;
    let cartData = {name, price, img, id, amount:1};
    addToCart(cartData);
   }

    cartBlock.classList.add('active');
});

cartBlock.addEventListener('click', function(e){
    let target = e.target.closest('.change');
    if(!target) return;
    cartAmount = 0;
    let id = target.closest('.cart__item').dataset.id;
    if(target.classList.contains('cart__more')){
        storageArr.forEach(elem=>{
            if(elem.id == id){
                ++elem.amount;
            }
        });
    } else if(target.classList.contains('cart__less')){
        storageArr.forEach((elem, index)=>{
            if(elem.id == id){
                --elem.amount;
                if(elem.amount<1) storageArr.splice(index, 1);
            }
        });
    } else{
        storageArr.forEach((elem, index)=>{
            if(elem.id == id){
                storageArr.splice(index, 1);
            }
        });
    }
    localStorage.setItem('cart', JSON.stringify(storageArr));
    displayCart();
});


function addToCart(cart){
    storageArr.push(cart);
    console.log(storageArr);
    localStorage.setItem('cart', JSON.stringify(storageArr));
   displayCart();
}

function displayCart(){
    cartAmount = 0;
    let items = JSON.parse(localStorage.getItem('cart'));
    cartBlock.querySelector('.cart__items').innerHTML ='';
    let total = 0;
   items.forEach(item=>{
    let newCartItem = `<div class="cart__item" data-id="${item.id}">
    <img src="${item.img}" alt="${item.name}">
    <div class="cart__info">
      <p class="cart__name">${item.name}</p>
      <p class="cart__price">$${item.price}</p>
      <button class="cart__remove change">Remove</button>
    </div>
    <div class="cart__btns">
      <button class="cart__more change"></button>
      <p class="cart__amount">${item.amount}</p>
      <button class="cart__less change"></button>
    </div>
    </div>`;
  total += item.amount * item.price; 
  cartBlock.querySelector('.cart__items').innerHTML+=newCartItem;
   });
  cartBlock.querySelector('.cart__total').textContent = `Total: $${total.toFixed(2)}`;
   
  checkAmout();
}
 
const showItems = async()=>{
    let data = await fetchData(allProductsUrl);
    displayItems(data, true);
}

function checkAmout(){
    storageArr.forEach(elem=>cartAmount+=elem.amount);
    cartNumber.textContent = cartAmount;
}

showItems();

