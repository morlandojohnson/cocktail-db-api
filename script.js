// Year for Copyright
document.querySelector(".year").innerHTML = new Date().getFullYear();

document.querySelector("#cocktail").addEventListener("click", getDrink);

document.querySelector("#random").addEventListener("click", randomDrink);

// Creating List from API call for ingredients and measurements

function createIngredientsList(drinkData) {
  const ingredientsList = document.querySelector(".cocktail-ingredients-list");
  ingredientsList.innerHTML = "";

  for (let i = 1; i <= 15; i++) {
    const ingredientKey = "strIngredient" + i;
    const measureKey = "strMeasure" + i;
    const ingredient = drinkData[ingredientKey];
    const measure = drinkData[measureKey];
    if (ingredient) {
      const listItem = document.createElement("li");
      listItem.textContent = `${measure ? measure + " " : ""}${ingredient}`;
      listItem.classList.add("cocktail-ingredient-item");
      ingredientsList.appendChild(listItem);
    } else {
      break;
    }
  }
}

//  Search call for API for Cocktail Recipe Finder
function getDrink() {
  let drink = document.querySelector("#input-cocktail").value.toLowerCase();

  fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${drink}`)
    .then((res) => res.json())
    .then((data) => {
      console.log(data.drinks);
      document.querySelector(".cocktail-name").innerText =
        data.drinks[0].strDrink;
      document.querySelector(".cocktail-img").src =
        data.drinks[0].strDrinkThumb;
      document.querySelector(".cocktail-instructions").innerText =
        data.drinks[0].strInstructions;
      createIngredientsList(data.drinks[0]);
    })
    .catch((err) => {
      console.log(`error ${err}`);
    });
}

function createRandomIngredients(drinkData) {
  const recommendList = document.querySelector(".recommend-ingredients-list");
  recommendList.innerHTML = "";

  for (let i = 1; i <= 15; i++) {
    const recommendIngredientKey = "strIngredient" + i;
    const recommendMeasureKey = "strMeasure" + i;
    const recommendIngredient = drinkData[recommendIngredientKey];
    const recommendMeasure = drinkData[recommendMeasureKey];
    if (recommendIngredient) {
      const recommendListItem = document.createElement("li");
      recommendListItem.textContent = `${
        recommendMeasure ? recommendMeasure + " " : ""
      }${recommendIngredient}`;
      recommendListItem.classList.add("recommend-ingredient-item");
      recommendList.appendChild(recommendListItem);
    } else {
      break;
    }
  }
}

// API Call for Random Drink

function randomDrink() {
  fetch("https://www.thecocktaildb.com/api/json/v1/1/random.php")
    .then((res) => res.json())
    .then((data) => {
      console.log(data.drinks);
      document.querySelector(".recommend-name").innerText =
        data.drinks[0].strDrink;
      document.querySelector(".recommend-img").src =
        data.drinks[0].strDrinkThumb;
      document.querySelector(".recommend-instructions").innerText =
        data.drinks[0].strInstructions;
      createRandomIngredients(data.drinks[0]);
    })
    .catch((err) => {
      console.log(`error ${err}`);
    });
}
