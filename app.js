
const data_container = document.getElementById('foods');
const searchBtn = document.getElementById('search-btn');


searchBtn.addEventListener('click', function () {
    const search = document.getElementById('search-field').value;
    data_container.innerHTML = '';
    if(search ===''){
        alert("please enter a  valid food name ");
    }
        getFood(search);
   
});

const displayDetails = name => {
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${name}`;
    fetch(url)
        .then(response => response.json())
        .then(data => {
            FoodInfo(data.meals[0]);
           
        });
};

const FoodInfo = food => {
    const foodDetailsDiv = document.getElementById('foodsDetails');

    foodDetailsDiv.innerHTML = `
    <img class="img-fluid rounded mb-4" src="${food.strMealThumb}" alt="">
    <h3>${food.strMeal}</h3>
    
    <h3 class="pt-4 pb-3  center"><i class="icon-fire icons"></i> Ingredients</h3>
    <ul class="list-unstyled mb-0">
        <li><i class="icon-check icons center"></i>${food.strMeasure1}, ${food.strIngredient1}</li>
        <li><i class="icon-check icons  center"></i>${food.strMeasure2}, ${food.strIngredient2}</li>
        <li><i class="icon-check icons  center"></i>${food.strMeasure3}, ${food.strIngredient3}</li>
        <li><i class="icon-check icons  center"></i>${food.strMeasure4}, ${food.strIngredient4}</li>
    </ul>

`;
};

function getFood(mealId) {
    const Api = `https://www.themealdb.com/api/json/v1/1/search.php?s=${mealId}`;

    fetch(Api)
        .then(response => response.json())
        .then(data => {
            displayFoods(data.meals);
        });

    const displayFoods = foods => {
        const foodsDiv = document.getElementById('foods');
        if (foods != null) {
            foods.map(food => {
                const foodDiv = document.createElement('div');
                foodDiv.className = 'col-md-3';
                const foodInfo = `
                        <div onclick="displayDetails('${food.idMeal}')" class="border rounded text-center" data-bs-toggle="collapse" data-bs-target="#foodsDetails">
                        <img class="img-fluid rounded-top" src="${food.strMealThumb}" alt="">
                        <h3 class="h4 py-4 px-2 mb-0">${food.strMeal}</h3>
                        </div>
                    `;
                foodDiv.innerHTML = foodInfo;
                foodsDiv.appendChild(foodDiv);
            });
        } 
    };
}
