import Search from './models/Search';
import Recipe from './models/Recipe';
import List from './models/List';
import Likes from './models/Likes'
import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView';
import * as listView from './views/listView';
import {elements,renderLoader, clearLoader} from './views/base';

// // Global state of the app
// -Search object(search query and search object)
// -current recipe object
// -shopping list object
// -liked recipes
// all of these data will be stored at all time
// in one9 central variable which we can an access
// throughout our controller
//state object will have the all controllers asits properties
export const state = {};
window.state = state;
//SEARCH CONTROLLER

const controlSearch = async () => {
    // - get the query view
    const query = searchView.getInput();
    
    if(query){
        // - new search object and add to state object
        
        state.search = new Search(query);
        state.search.cond = 'result not found';
        console.log(`${state.search.cond}: befor fetching the search recipe`);
        //prepare UI for results
        searchView.clearInput();  
        searchView.clearResults();     
        //render the loader animation 
        renderLoader(elements.searchRes);
        //hightlight the current recipe
        
        //search for recipe
        await state.search.getResults();
        // state.recipe.parseIngredients();
        if(state.search.cond == 'result not found'){
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

            console.log(`${state.search.cond}: if the fetching the recipe is failed`);
        }
        
        //this new instance based on the search class.And on that, we of course haveto getResults methods available,so that we can then later display these results
        //30 element arrar will be stored 
        //render results on  UI
        clearLoader();
        
        searchView.renderResults(state.search.result);
        
    }
    
    
}

elements.searchForm.addEventListener('submit',e => {
    e.preventDefault();
    controlSearch();
    
});


elements.searchForm.addEventListener('click', e =>{
    const btn = e.target.closest('.btn-inline');
    if (btn){
        const goToPage = parseInt(btn.dataset.goto,10);
        searchView.clearResults(); 
        searchView.renderResults(state.search.result,goToPage);
        
    }
});



//RECIPE CONTROLLER
const controlRecipe = async () =>{
    
    //getting id from the url and extractng the url uri  from it ising hash event
    const uri = window.location.hash.replace('#','');
    

    if(uri){
        //prepare ui for changes


        //create new recipe object
        state.recipe = new Recipe(uri);
        
     
        

        //get recipe data
        
        await state.recipe.getRecipe();
        state.recipe.parseIngredients();
        recipeView.clearRecipe();
        recipeView.renderDish(state.recipe);
        //render the recipe

        //update servings
        

    }
    
}




// window.addEventListener('hashchange', controlRecipe);
// window.addEventListener('load', controlRecipe) 
    
//syntax to call same eventListener for mutiple events
['hashchange', 'load'].forEach(event => window.addEventListener(event, controlRecipe));

//LIST CONTROLLER

const controlList = () =>{
    //create a new list if there is none yet

    if(!state.list) state.list = new List();


    //add each ingredient to the list
    state.recipe.ingredients.forEach(el =>{
        //el ppoint towards each ingredient
        const item = state.list.addItem(el.count,el.unit, el.ingredient);
        listView.renderitem(item);
    });
}


//handle delete and update list item events 
elements.shopping.addEventListener('click', e=>{
    const id = e.target.closest('.shopping__item').dataset.itemid;
    //delete bittom

    if(e.target.matches('.shopping__delete, .shopping__delete *')){
        //delete from state
        state.list.deleteItem(id)

        //delete form UI
        listView.deleteItem(id);
    }else if(e.target.matches('.shopping__count-value')){
        const val =pardseFloat(e.target.value, 10);
        state.list.updateCount(id, val);
    }
});
state.likes = new Likes();
  
//LIKE CONTROLLER 
const controlLikes = (recipe) =>{
    //adding Likes property to state function using constructor call
    
    
    
    state.likes.addLike(recipe);
//     elements.recipe.addEventListener('click', e =>{
//     if(e.target.matches('.recipe__love')){
//         state.likes.addLike(recipe);
//     }

// })
}



//handling recipe button clicks
//event.target proprty retuns the traget element on which the event has occured
elements.recipe.addEventListener('click', e =>{
    //'btn-decrease*' will include all the child elements
    //event.matches return true if the selected element matches in any of the child elements in the parent element
    if(e.target.matches('.btn-decrease, .btn-decrease *')){
       
        if(state.recipe.servings>1){
            state.recipe.updateServings('dec');
            recipeView.updateServingsIngredients(state.recipe);
        }
        
    }else if(e.target.matches('.btn-increase , .btn-increase *')){
        if(state.recipe.servings>1){
            state.recipe.updateServings('inc');
            recipeView.updateServingsIngredients(state.recipe);
        }
    }else if(e.target.matches('.recipe__btn--add, .recipe__btn--add *')){
        controlList();
    }else if(e.target.matches('.recipe__love')){
        controlLikes(state.recipe);
    }

    

    
});


window.l = new List();











