drink.addEventListener('click', getRandomCocktail);

document.getElementById('drinkForm').addEventListener('submit', (e) => {
    e.preventDefault();
    let drinkname = document.getElementById('drink-input').value;
    getCocktail(drinkname)
})

function getRandomCocktail() {
    fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php')
        .then(
            function(response) {
                if (response.status !== 200) {
                    console.log('Looks like there was a problem. Status code:' + response.status);
                    return;
                }
                response.json().then(function(data) {
                    displayCocktail(data);
                });
            }
        )
        .catch(function(err) {
            console.log('Fetch Error', err);
        });
}

function getCocktail(drinkname) {
    if (drinkname == "") {
        return;
    }
    fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=' + drinkname)
        .then(
            function(response) {
                if (response.status !== 200) {
                    console.log('Looks like there was a problem. Status code:' + response.status);
                    return;
                }
                response.json().then(function(data) {
                    displayCocktail(data);
                });
            }
        )
        .catch(function(err) {
            console.log('Fetch Error', err);
            document.getElementById("noDrink").classList.toggle("invisible");
        });
}

function displayCocktail(cocktail) {
    if (cocktail.drinks == null) {
        return;
    }
    document.getElementById('drink-section').innerHTML = "";
    document.getElementById('random-drink-name').innerHTML = cocktail.drinks[0].strDrink;
    document.getElementById('random-drink-img').innerHTML = `<img src="${cocktail.drinks[0].strDrinkThumb}" />`;
    document.getElementById('random-drink-instruction').innerHTML = cocktail.drinks[0].strInstructions;

    let drinkSection = document.querySelector('#drink-section');

    for (let i = 1; i < 16; i++) {
        let ingredient = document.createElement('random-drink-ingredients')
        ingredient.className = "card-subtitle mb-2 text-muted"
        ingredient.innerHTML = cocktail.drinks[0][`strIngredient${i}`];
        drinkSection.appendChild(ingredient);
        drinkSection.appendChild(document.createElement("br"));
        if (cocktail.drinks[0][`strIngredient${i}`] == null) {
            break;
        }
    }
}

getRandomCocktail();