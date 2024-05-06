document.querySelector("#cocktail").addEventListener("click", getDrink);

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
    })
    .catch((err) => {
      console.log(`error ${err}`);
    });
}
