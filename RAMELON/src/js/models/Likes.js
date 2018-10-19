import {elements} from '../views/base';
import {state} from  '../index';
export default class Likes{
    constructor(){
        //like array to stror the liked recipes
        this.likes  = [];
    }
    //fucntion to add the liked recipe to liked list 
    addLike(like){
        //like object to store the info about the current recipe been liked 
        console.log(like);
        //current liked recipe object pushed to the array
       if (this.likes.findIndex(repeat)==-1){
            this.likes.push(like);
       }
       function repeat(el){
           return el.uri === like.uri
       }
        
        return like 
    }
    //function to delete the recipe from the list 
    delete(id){
        const index = this.likes.findIndex(el =>{
            el.id === id
        });
        return this.items.splice(index ,1);
    }
    //
    isLiked(id){
        return this.likes.findIndex(el => el.id ===id) !== -1;
    }

    getNumLikes() { 
        return this.likes.length;

    }
}