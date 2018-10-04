import Search from './models/Search';
import Recipe from './models/Recipe';
import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView';
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
        

    }
    
}




// window.addEventListener('hashchange', controlRecipe);
// window.addEventListener('load', controlRecipe) 
    
//syntax to call same eventListener for mutiple events
['hashchange', 'load'].forEach(event => window.addEventListener(event, controlRecipe));














