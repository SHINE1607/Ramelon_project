import axios from 'axios';
import * as SearchView from '../views/searchView';
import {elements, clearLoader} from '../views/base';
import {proxy, ID, key} from '../config.js';
import {state, cond} from '../index'
export default class Search{
    constructor(query){
        this.query = query;
    }
    async getResults(){
        //removing the loader after the list has loaed
        try{
            const res = await axios(`${proxy}https://api.edamam.com/search?q=${this.query}&app_id=${ID}&app_key=${key}`);
            //const recipe = await axios(`res.data.hits.`);
            this.result = res.data.hits;
            elements.recipe.innerHTML = '';
            this.cond = 'result found';
            console.log(res);
            console.log(`${this.cond}: after fetching the search recipe`);

            if(res.data.hits.length == 0){
                this.cond = 'result not found';
                
            }
            //console.log(this.result);
            
        }
        catch(error){
            
            const markup = `
            <div class = "error-handler" style ="
                margin:10%;
                font-family:Codec Warm Trial;
                text-transform: uppercase;
                font-weight: 600;
                color: #F48982;
                font-size: 2.5rem;">
                <i class="material-icons">error_outline</i>
                Recipe not found!
            </div>`;

            elements.recipe.insertAdjacentHTML('afterbegin', markup);
        }
        
    
    }

}


