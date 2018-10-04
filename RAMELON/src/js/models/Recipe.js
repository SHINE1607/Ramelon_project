import axios from 'axios';
import {proxy, ID, key, f2fkey} from '../config.js';
import {state} from '../index'
export default class Recipe{
    //each recipe selected will be identified by an id  and the rest of the dtaa will be retrievd from that
    constructor(uri){
        this.uri = uri;
        
    }
    async getRecipe() {
            
            const rec_arr = state.search.result; 
            
            rec_arr.forEach((el) =>{
                if(el.recipe.uri === this.uri){
                    console.log(el.recipe.label);
                    this.title = el.recipe.label;
                    this.chef = 'Ummachi';
                    this.img = el.recipe.image;
                    this.url = el.recipe.url;
                    this.ingredients = el.recipe.ingredientLines;
                    this.time = el.recipe.totalTime;
                    this.servings = 4; 
                }
               
            });
           
            
            
    }
     
    parseIngredients() {
        
        const unitsLong = ['tablespoons','tablespoons','ounce', 'ounces','teaspoon','teaspoons','cups', 'pounds','slices', 'batch'];
        const unitsShort = ['tbsp', 'tbsp', 'oz', 'oz', 'tsp', 'tsp', 'cup', 'pound', 'slice', 'batch'];
        //here newIngredients array store the elements in the new way as objects 
        const newIngredients = this.ingredients.map(el =>{
            //uniform units
                //create 2 arrays :
                 //one for how they are in the documentation and 
                 //other one for wat we need
                 //function to convert old units to new units
            let ingredient = el.toLowerCase();
            unitsLong.forEach((unit,i) =>{
                ingredient  = ingredient.replace(unit, unitsShort[i]);
            });
            
            //parse ingredients into count , unit and ingredients
            //el2 is just the parameter to be passed to the findIndex() function 
            const arrIng = ingredient.split(' ');
            const unitIndex = arrIng.findIndex(el2 => unitsShort.includes(el2));
            //unitIndex is to test whether there is a unit or not that has the index of the unit
            //object to store the current ingreident properties
            let objIng;
            //object to store the properties odf the current ingredient

            if(unitIndex > -1){
                //there is a unit
                const arrCount = arrIng.slice(0, unitIndex);
                let count;

                if(arrCount.length ===1){
                    count = eval(arrIng[0].replace('-', '+'));
                }else{
                    count = (parseInt(arrIng[0]) + parseFloat(arrIng[1])).toString();
                    //or u can do it like this
                    //count = eval(arrIng.slice(0,unitIndex).join('+'));
                }

                objIng = {
                    count,
                    unit: arrIng[unitIndex],
                    ingredient : arrIng.slice(unitIndex +1).join(' ')    
                };
            }else if(parseInt(arrIng[0],10)){
                objIng = {
                    count : parseInt(arrIng[0],10),
                    unit : '',
                    ingredient : arrIng.slice(1).join(' ')
                }
                //here slice function will return an array cutiing down the first element
                //there is no unit but first element is snumber
                //eg : 1 1/2 cup of  sugar 
            }else if(unitIndex === -1){
                
                //there is no unit and no number in first position  
                objIng ={
                    count : 1,
                    unit: '',
                    //in es6 just writing the property it will create the same
                    ingredient

                }
            }
 //map function works like whatever returned will be stored in the corrent position o fthe array
            //if nothing is returned, a new array will be returned bu default
            return objIng;
        });
        this.ingredients = newIngredients;
        console.log(this);
    }
}