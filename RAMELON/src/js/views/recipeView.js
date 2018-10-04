import {elements} from './base'

const createIngredient  = ingredient =>
    `<li class="1recipe__item">
            <i class="material-icons" style = "color:#ff6666">done</i>
            <div class="recipe__count">${ingredient.count}</div>
            <div class="recipe__ingredient">
                <span class="recipe__unit">${ingredient.unit}</span>
                ${ingredient.ingredient}
            </div>
     </li>`

;
export const renderDish = (recipeObj) =>{
    console.log(recipeObj);
    const markup = ` 
        <figure class="recipe__fig">
            <img src="${recipeObj.img}" alt="${recipeObj.title}" class="recipe__img">
            <h1 class="recipe__title">
                <span>${recipeObj.title}</span>
            </h1>
        </figure>


        <div class="recipe__details">
        <div class="recipe__info">
            <i class="material-icons" style = "color:#ff6666">alarm</i>
            <span class="recipe__info-data recipe__info-data--minutes">${recipeObj.time}</span>
            <span class="recipe__info-text"> minutes</span>
        </div>
        
        <div class="recipe__info">
        <i class="material-icons" style = "color:#ff6666">info_outline</i>
        <span class="recipe__info-data recipe__info-data--people">${recipeObj.servings}</span>
        <span class="recipe__info-text"> servings</span>
        <div class="recipe__info-buttons">
            <button class="btn-tiny">
            <i class="material-icons" style = "color:#ff6666">remove_circle_outline</i>
            </button>
            <button class="btn-tiny">
            <i class="material-icons" style = "color:#ff6666">add_circle_outline</i>
            </button>
        </div>
    </div>

    <button class="recipe__love">
        <i class="material-icons" style = "color:white">favorite_border</i>
    </button>
</div>
<div class="recipe__ingredients">
    <ul class="recipe__ingredient-list">
        
       
    ${recipeObj.ingredients.map(el => createIngredient(el)).join(' ')}
    
    <button class="btn-small recipe__btn">
            <i class="material-icons">add_shopping_cart</i>
            <span>Add to shopping list</span>
    </button>
</div>
<div class="recipe__directions">
<h2 class="heading-2">How to cook it</h2>
<p class="recipe__directions-text">
This recipe was carefully designed and tested by
<span class="recipe__by">${recipeObj.chef}</span>. Please check out directions at their website.
</p>
<a class="btn-small recipe__btn" href="${recipeObj.url}" target="_blank">
<span>Directions</span>
    <i class="material-icons">search</i> 
</a>
</div>`;
    elements.recipe.insertAdjacentHTML('afterbegin', markup);

}

export const clearRecipe = () =>{
    console.log('inneganum work cheyyo');
    elements.recipe.innerHTML = '';
}