export function displayItems(data, featured){
    let container = document.querySelector('.grid-items');
    if(!container) return; 
    container.innerHTML ='';
    if(document.querySelector('.loading')) document.querySelector('.loading').remove();
   
    if(featured){
        data = data.slice(0, 3);
        featured = false; 
    } 
 
   data.forEach(item=>{
    let id = item.id;
    let {name, price} = item.fields;
    let img = item.fields.image[0].url;
    
    let newItem = `<div class="featured__item item" data-id='${id}'>
    <img src="${img}" alt="${name}" class='featured__img'>
    <h4>${name}</h4>
    <p class='item__price'>$ ${price/100}</p>
    <div class="item__btns">
    <a href="product.html?id=${id}"><i class="fas fa-search search"></i></a>
    <button><i class="fas fa-shopping-cart add-cart"></i></button>
    </div>
  </div>`;
    container.innerHTML+=newItem;
   });
}