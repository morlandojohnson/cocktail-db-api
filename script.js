// Year for Copyright
document.querySelector(".year").innerHTML = new Date().getFullYear();

// Variables for function
const cocktailName = document.querySelector(".cocktail-name");
const cocktailImg = document.querySelector(".cocktail-img");
const coctailInstruction = document.querySelector(".cocktail-instructions");
const coctailGlass = document.querySelector(".cocktail-glass");
const cocktailBoxes = document.querySelectorAll(".cocktail-box");

// Event Listeners for Search
document
  .querySelector("#cocktail-btn")
  .addEventListener("click", () => getDrink("search"));
document
  .querySelector("#recommend-btn")
  .addEventListener("click", () => getDrink("random"));

// Creating List from API call for ingredients and measurements

function createIngredientsList(drinkData) {
  const ingredientsList = document.querySelector(".cocktail-ingredients-list");
  ingredientsList.innerHTML = "";

  for (let i = 1; i <= 15; i++) {
    const ingredient = drinkData["strIngredient" + i];
    const measure = drinkData["strMeasure" + i];
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

// Function to Search for drink or return recommended drink

function getDrink(type) {
  let url;
  if (type === "search") {
    const drink = document
      .querySelector("#cocktail")
      .value.trim()
      .toLowerCase();
    if (!drink) {
      return;
    }
    url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${drink}`;
  } else {
    url = "https://www.thecocktaildb.com/api/json/v1/1/random.php";
  }

  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      cocktailName.innerText = data.drinks[0].strDrink;
      cocktailImg.src = data.drinks[0].strDrinkThumb;
      coctailInstruction.innerText = data.drinks[0].strInstructions;
      coctailGlass.innerText = `Serve in: ${data.drinks[0].strGlass}`;
      createIngredientsList(data.drinks[0]);
      cocktailBoxes.forEach((box) => {
        box.style.display = "flex";
      });
    })
    .catch((err) => {
      console.log(`error ${err}`);
    });
}

// Smooth Scroll

const links = document.querySelectorAll("a");

for (const link of links) {
  link.addEventListener("click", clickHandler);
}

function clickHandler(event) {
  event.preventDefault();
  const href = this.getAttribute("href");
  const offsetTop = document.querySelector(href).offsetTop;

  scroll({
    top: offsetTop,
    behavior: "smooth",
  });
}

// Mobile Hamburger Menu

const hamburger = document.querySelector(".hamburger");
const navList = document.querySelector(".nav-list");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navList.classList.toggle("active");
});

document.querySelectorAll(".nav-link").forEach((link) =>
  link.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navList.classList.remove("active");
  })
);
