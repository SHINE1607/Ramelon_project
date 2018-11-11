import {elements} from  './base'
import Likes from '../models/Likes'
import { state } from '..';
export const updateLikeList = recipe =>{
    elements.likesPanel.innerHTML = '';
    console.log(state.Likes.likes);
    state.Likes.likes.forEach(el =>{
        
        let markup = `
    <li>
        
            <figure class="likes__fig">
                <img src="${el.img}" alt="Test">
            </figure>
            <div class="likes__data">
                <h4 class="likes__name">${el.title}</h4>
                <p class="likes__author">Ummachi</p>
            </div>
        
    </li>
`;
        elements.likesPanel.insertAdjacentHTML('beforeend', markup);
        //persit the data in local storage 
        
        
    });
    
}

export const toggleLikeMenu = likeIndex => {
    if(likeIndex == 0){
        document.querySelector('.recipe__love').innerHTML = `<i class="material-icons" style = "color:white">favorite</i>`
    } 
    else{
        document.querySelector('.recipe__love').innerHTML = `<i class="material-icons love" style = "color:white">favorite_border</i>`
    }
    
};


