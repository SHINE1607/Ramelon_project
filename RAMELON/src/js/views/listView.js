import {elements} from './base';

export const renderitem = item =>{
    console.log(item);
    const markup = 
    `
    <li class="shopping__item" data-itemid = ${item.id}>
        <div class="shopping__count">
            <input type="number" value="${item.count}" step="${item.count}" class = "shopping__count-value">
            <p>${item.unit}</p>
        </div>
        <p class="shopping__description">${item.ingredient}</p>
        <button class="shopping__delete btn-tiny">
        <i class="material-icons">highlight_off</i>
        </button>
    </li>
    `;
    elements.shopping.insertAdjacentHTML('beforeend', markup);
};



export const deleteItem = id =>{
    console.log('ee kuntham enthanu work cheyyathathu')
    const item = document.querySelector(`[data-itemid="${id}"]`);
    if(item) {
        item.parentElement.removeChild(item);
    }
};