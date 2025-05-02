let recipes = [];

async function loadRecipes() {
  const res = await fetch('recipes.json');
  recipes = await res.json();
  populateIngredientOptions();
  renderRecipes();
}

function renderRecipes() {
  const grid = document.getElementById('recipeGrid');
  const mealType = document.getElementById('mealTypeFilter').value;
  const ingredient = document.getElementById('ingredientFilter').value;
  const search = document.getElementById('searchInput').value.toLowerCase();

  grid.innerHTML = '';

  recipes.filter(recipe => {
    const matchesMeal = !mealType || recipe.mealType === mealType;
    const matchesIngredient = !ingredient || recipe.ingredients.includes(ingredient);
    const matchesSearch = recipe.name.toLowerCase().includes(search);
    return matchesMeal && matchesIngredient && matchesSearch;
  }).forEach(recipe => {
    const card = document.createElement('div');
    card.className = "bg-white rounded-2xl shadow p-4";
    card.innerHTML = `
      <img src="${recipe.image}" alt="${recipe.name}" class="rounded-xl h-40 w-full object-cover mb-2" onerror="this.src='https://via.placeholder.com/150'" />
      <h2 class="text-lg font-semibold text-pink-700">${recipe.name}</h2>
      <p class="text-sm mb-1"><strong>Ingredients:</strong> ${recipe.ingredients.join(', ')}</p>
      <p class="text-sm"><strong>Instructions:</strong> ${recipe.instructions}</p>
    `;
    grid.appendChild(card);
  });
}

function populateIngredientOptions() {
  const allIngredients = new Set();
  recipes.forEach(r => r.ingredients.forEach(i => allIngredients.add(i)));
  const filter = document.getElementById('ingredientFilter');
  allIngredients.forEach(ing => {
    const opt = document.createElement('option');
    opt.value = ing;
    opt.textContent = ing;
    filter.appendChild(opt);
  });
}

document.getElementById('mealTypeFilter').addEventListener('change', renderRecipes);
document.getElementById('ingredientFilter').addEventListener('change', renderRecipes);
document.getElementById('searchInput').addEventListener('input', renderRecipes);

loadRecipes();
