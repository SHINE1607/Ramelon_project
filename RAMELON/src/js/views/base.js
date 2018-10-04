export const elements = {
    searchInput: document.querySelector('.search__field'),
    searchForm :document.querySelector('.search'),
    searchResList : document.querySelector('.results__list'),
    searchRes : document.querySelector('.results'),
    searchResPages: document.querySelector('.results__pages'),
    recipe: document.querySelector('.recipe')
};

export const elementStrings = {
    loader: 'loader'
};


export const renderLoader = parent =>{
   
    const loader = `
    <div class = "${elementStrings.loader}"></div>`;
    parent.insertAdjacentHTML('afterbegin', loader);
};

//function removing the loader after the list has loaed
export const clearLoader =() =>{
    
    const loader = document.querySelector(`.${elementStrings.loader}`);
    if(loader){
        loader.parentElement.removeChild(loader);
    }
};

