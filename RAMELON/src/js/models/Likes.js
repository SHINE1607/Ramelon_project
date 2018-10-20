import {elements} from '../views/base';
import {state} from  '../index';
import * as LikeView from '../views/likeView';
export default class Likes{
    constructor(){
        //like array to stror the liked recipes
        this.likes  = [];
    }
    //fucntion to add the liked recipe to liked list 
    addLike(like){
        //like object to store the info about the current recipe been liked 
        
        //current liked recipe object pushed to the array
        this.likes.push(like);
        this.persistData();
        return like 
    }
    //function to delete the recipe from the list 
    delete(uri){
        const index = this.likes.findIndex(el =>{
            el.uri === uri
        });
        
        return this.likes.splice(index ,1);
        this.persistData();
    }
    //
    isLiked(id){
        return this.likes.findIndex(el => el.id ===id) !== -1;
    }

    getNumLikes() { 
        return this.likes.length;

    }
    persistData() {
        const storage  = localStorage.setItem('likes', JSON.stringify(this.likes));
        //restoring the old files to current likes list after reloading
        if(storage){
            this.likes = storage;
        }
    }
    readData() {
        
    }
} 
