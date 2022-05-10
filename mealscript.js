fetch("https://www.themealdb.com/api/json/v1/1/random.php")
    .then((response) => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error("NETWORK RESPONSE ERROR");
        }
    })
    .then(data => {
        console.log(data);
        displayMeal(data)
    })
    .catch((error) => console.error("FETCH ERROR:", error));

function displayMeal(data) {

    const meal = data.meals[0];
    const mealDiv = document.getElementById("meal");

    // meal name
    const mealName = meal.strMeal;
    const heading = document.createElement("h1");
    heading.innerHTML = mealName;
    mealDiv.appendChild(heading);

    // category
    const mealCategory = meal.strCategory;
    const category = document.createElement("h2");
    category.innerHTML = mealCategory;
    mealDiv.appendChild(category);

    //meal instructions
    const mealInstructions = meal.strInstructions;
    const body = document.createElement("h4");
    body.innerHTML = mealInstructions;
    mealDiv.appendChild(body);

    // meal image
    const mealImg = document.createElement("img");
    mealImg.src = meal.strMealThumb;
    mealDiv.appendChild(mealImg);
    document.body.style.backgroundImage = "url('" + meal.strMealThumb + "')";

    // meal ingredients
    const mealIngredients = document.createElement("ul");
    mealDiv.appendChild(mealIngredients);

    const getIngredients = Object.keys(meal)
        .filter(function (ingredient) {
            return ingredient.indexOf("strIngredient") == 0;
        })
        .reduce(function (ingredients, ingredient) {
            if (meal[ingredient] != null) {
                ingredients[ingredient] = meal[ingredient];
            }
            return ingredients;
        }, {});

    for (let key in getIngredients) {
        let value = getIngredients[key];
        listItem = document.createElement("li");
        listItem.innerHTML = value;
        mealIngredients.appendChild(listItem);
    }

}