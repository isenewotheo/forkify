// Date: 17 november 2020;
// forkify shop;


let recipeList = document.querySelector('.recipe-list');
let recipeProperty = document.querySelector('.recipe-property');
let cart = document.querySelector('.cart');
let searchInput = document.querySelector('#input-search-text');
let searchButton = document.querySelector('#search-btn');
let favorite = document.querySelector('#Capa_1');
let loadingRecList = document.querySelector('#loading-recipe-list');
let loadingRecprop = document.querySelector('#loading-recipe-property');
let loadingCart = document.querySelector('#loading-cart');
let recipeMainList = document.querySelector('#recipe-main-list');
let cartList = document.querySelector('#cart-list');
let property = document.querySelector('#property');
let clearInput = document.querySelector('#clear-input');
let favoriteModal = document.querySelector('.favorite-modal')
let closeModal = document.querySelector('#close-modal');
let recipeTemplate = `
                    <li class="recipe">
                        <img src="/assets/images/ajax-loader.gif" alt="##">
                        <div class="recipe-name">
                            Fried pizza
                        </div>
                    </li>`;
let recipePropertyTemplate =
`<div class="recipe-property">
<img src="assets/images/ajax-loader.gif" alt="Loading....." class="loading" id="loading-recipe-property">
<div id="property">
    <div class="recipe-head">
        <img src="/assets/images/ajax-loader.gif" alt="">
        <h1><i>Best pizza</i></h1>
        <div id="publisher">
            <i> published by : <a href="pub">de publuser</a></i>
        </div>
    </div>
    <div class="recipe-body">
        <h2>INGREDIENT</h2>
        <ol class="ingredient">
            <li>ingredient 1 </li>
            <li>ingredient 1 </li>
            <li>ingredient 1 </li>
            <li>ingredient 1 </li>
        </ol>
        <p style="text-align: center;">
            click this <a href="source to learn">link</a> to learn to make this 
            
        </p>
    </div>
</div>
</div>`
// closes favorite modal
closeModal.addEventListener('click', () => {
    favoriteModal.style.display = 'none';
});

// opens favorite modal
favorite.addEventListener('click', () => {
    favoriteModal.style.display = 'block';
});


// clear search input field
clearInput.addEventListener('click', () => {
    searchInput.value = "";
});


// Search initialization
searchButton.addEventListener('click', search);
function search() {
    if (searchInput.value !== "") {
        // 1. search API server
        loadingRecList.style.display = "block";
        recipeMainList.innerHTML = "";
        fetchSearchResult(searchInput.value);
    } else { 
        alert("Please search input a recipe in the search input") 
    }
}

// fetches search result from api
function fetchSearchResult(searchQuery) {
    fetch(`https://forkify-api.herokuapp.com/api/search?q=${searchQuery}`)
    .then(result => result.json())
    .then(data => {
        loadingRecList.style.display = 'none';
        let recipes = data.recipes;
        recipes.forEach(recipe => {
            let currentRecipe =  `
            <li class="recipe" id="${recipe.recipe_id}">
                <img class="recipe-image" id="${recipe.recipe_id}" src="${recipe.image_url}" alt="#">
                <div class="recipe-name" id="${recipe.recipe_id}">
                    ${recipe.title}
                </div>
            </li>`;
            recipeMainList.innerHTML += currentRecipe;
        });
    });
}

recipeMainList.addEventListener('click', e => {
    let t = e.target.className;
    if (t === "recipe" || t === "recipe-image" || t === "recipe-name") {
        //1 clear view and show loader
        property.innerHTML = "";
        loadingRecprop.style.display = "block";
        //2 get it id
        let recID = e.target.id;
        console.log(recID);
        //3 request it using it id from the server
        requestRecipeProperty(recID);
        //3
    } else {
        return
    }
});

//rendering recipe property 
function requestRecipeProperty(recid){
    console.log('getting item')
    let rId = parseInt(recid);
    fetch(`https://forkify-api.herokuapp.com/api/get?rId=${rId}`)
    .then(result => result.json())
    .then(data => {
        loadingRecprop.style.display = "none";
        let recipe = data.recipe
        let ingredients = "";
        recipe.ingredients.forEach(ingredient => {
            ingredients += `<li>${ingredient}</li>`
         });
        let template = `
            <div class="recipe-head">
                <img src="${recipe.image_url}" alt="">
                <h1><i>${recipe.title}</i></h1>
                <div id="publisher">
                    <i> published by : <a href="${recipe.publisher_url}">${recipe.publisher}</a></i>
                </div>
            </div>
            <div class="recipe-body">
                <h2>INGREDIENT</h2>
                <ol class="ingredient">
                    ${ingredients}                    
                </ol>
                <p style="text-align: center; margin:20px 0px;">
                    click this <a href="${recipe.source_url}">link</a> to learn to make this 
                </p>
            </div>`;
    property.innerHTML = template;
    });
}