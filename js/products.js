import {allProductsUrl} from './main.js';
import { fetchData } from './functions/fetchData.js';
import { displayItems } from './functions/displayItems.js';

let search = document.querySelector('.search-input');
let filterContainer = document.querySelector('.filter__buttons');
let range = document.querySelector('.filter__range input');

range.addEventListener('change', async function(e){
    let value = +e.target.value;
    range.nextElementSibling.textContent=`Value: $${value}`;

    let filtered = await filterItems(value);
    displayItems(filtered, false);
});

search.addEventListener('input', async function(e){
    let selected = filterContainer.querySelector('.selected');
    let value = selected.dataset.value;
    let filtered = await filterItems(value);
   let searched = filtered.filter(elem=>{
      return elem.fields.name.includes(search.value);
   });
   
   displayItems(searched, false);
});


filterContainer.addEventListener('click', async function(e){
    let btn = e.target.closest('button');
    if(!btn) return;
    let selected = filterContainer.querySelector('.selected');
    selected.classList.remove('selected');
    btn.classList.add('selected');
    let filtered =  await filterItems(btn.dataset.value);
    displayItems(filtered, false);
});

async function filterItems(value){
    let products = await fetchData(allProductsUrl);
    let filtered = '';
    if(value=='all'){
       filtered = products;
    }else if(typeof value =='string'){
        filtered = products.filter(elem=>{
        return elem.fields.company == value;
        });
    } else{
        filtered = products.filter(elem=>{
            console.log(elem.fields.price/100, value);
        return elem.fields.price/100 < value;
        });
    }
    console.log(filtered);
    return filtered;
}

//================================================


const showItems = async()=>{
    let data = await fetchData(allProductsUrl);
    displayItems(data, false);
}

showItems();