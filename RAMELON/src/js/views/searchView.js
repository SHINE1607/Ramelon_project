import { elements, clearLoader } from './base'
//getting input from the user function 
export const getInput = () =>{
    return elements.searchInput.value;
}
//clearing thesearch field on clicking search button
export const clearInput = () =>{
    elements.searchInput.value = '';
};
//function to clear the previous results on new serach
export const clearResults = () =>{
    elements.searchResList.innerHTML = '';
    elements.searchResPages.innerHTML = '';
};
 //function to limit the recipe title to 17 characters




const limitRecipeTitle = (title,limit =28) =>{
    const newTitle = [];
    const text = '';
    if (title.length > limit){
        title.split(' ').reduce((acc, cur) =>{
         if(acc + cur.length <= limit) {
            newTitle.push(cur);
         }   
         return acc + cur.length;
        }, 0);
        return`${newTitle.join(' ')}...`;
    }
        return title;
};
//split will store each word into an array and return it
//reduce function calls a specific function for each elemnent of the array
//0 is the initial value of the acc

const renderRecipe = recipe => {
    
    //DOM Manipulation
    //in ES6 we can write the HTML FILE as if we r writing the real Html file, no need to orient
    const finalTitle = limitRecipeTitle(recipe.recipe.label);
    
    const markup  =`
        <li>
        <a class="results__link" href="#${recipe.recipe.uri}">
            <figure class="results__fig">
                <img src="${recipe.recipe.image}" alt="${recipe.title}">
            </figure>
            <div class="results__data">
                <h4 class="results__name">${limitRecipeTitle(recipe.recipe.label)}...</h4>
                <p class="results__author">Chef:Ummachi<br>
                Calories:${recipe.recipe.calories}<br>
                </p>
                
            </div>
        </a>
    </li>`;
    // insertAdjacentHTML() parses the specified text as HTML or XML and inserts the resulting nodes into the DOM tree at a specified position. It does not reparse the element it is being used on and thus it does not corrupt the existing elements inside that element. This avoids the extra step of serialization, making it much faster than direct innerHTML manipulation.
    elements.searchResList.insertAdjacentHTML('beforeEnd', markup);
}

const createButton = (page, type) =>`
        <button class="btn-inline results__btn--${type}" data-goto =${type === 'prev'?page -1 :page +1}>
        <i class="material-icons">fast_${type === 'prev' ? 'rewind' : 'forward'}</i>
            <span>Page ${type === 'prev' ? page-1 :page +1}</span>
        </button>        
`;

const renderButtons = (page, numResults, resPerPage) =>{
    const pages = Math.ceil(numResults/resPerPage);
    let button;
    if(page ===1 && pages > 1){
        //button to go to page 2
        button = createButton(page,'next'); 
    }else if(page < pages){
        //both the buttons
        button = `
        ${createButton(page,'next')}
        ${createButton(page,'prev')}`; 
        
    }else if(page === pages && pages > 1){
        //only button to go to previous page
        button = createButton(page,'prev'); 
    }
    
    elements.searchResPages.insertAdjacentHTML('afterbegin',button);
};
//going through all recipe elements of the array and calling the renderRecipe() function for each of them
export const renderResults = (recipes, page = 1, resPerPage = 10) =>{
    // recipes.forEach(el =>{
    //     renderRecipe(el);
    // })
    //but there is  no need of this
    //it will automatically pass the current element to renderRecipe

    const start = (page -1) *resPerPage;
    const end = start + resPerPage;
    recipes.slice(start,end).forEach(renderRecipe);

    renderButtons(page, recipes.length, resPerPage);
}
 
