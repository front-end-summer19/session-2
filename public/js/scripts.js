const homepage = () => {
  fetch(`api/recipes`)
  .then(response => response.json())
  .then(recipes => renderStories(recipes));
  
  const renderStories = recipes => {
    // console.log(recipes);
    recipes.forEach(recipe => {
      recipeEl = document.createElement('div');
      recipeEl.innerHTML = `
  <img src="img/${recipe.image}" />
  <h3>${recipe.title}</h3>
  <p>${recipe.description}</p>
  <h4>Ingredients</h4>
  <ul>
    ${recipe.ingredients.map(ingredient => `<li>${ingredient}</li>`).join('')}
  </ul>
  <h4>Preparation</h4>
  <ul>
    ${recipe.preparation.map(prep => `<li>${prep.step}</li>`).join('')}
  </ul>
  <a href="/">Back</a>
  `;
      document.querySelector('#root').append(recipeEl);
    });
    
    const deleteBtns = document.querySelectorAll('.del');
    // console.log(deleteBtns);
    const delBtns = Array.from(deleteBtns);
    // console.log('delBtns', delBtns);
    delBtns.forEach(btn => {
      btn.addEventListener('click', e => {
        fetch(`api/recipes/${btn.dataset.id}`, {
          method: 'DELETE'
        });
        e.preventDefault();
        location.reload();
      });
    });
    
  }
}

const detail = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const recipeId = urlParams.get('recipe');
  console.log(recipeId);
  fetch(`api/recipes/${recipeId}`)
    .then(response => response.json())
    .then(recipe => renderStory(recipe));
  // NEW
  const renderStory = recipe => {
    console.log(recipe);
    recipeEl = document.createElement('div');
    recipeEl.innerHTML = `
      <img src="img/${recipe.image}" />
      <h3>${recipe.title}</h3>
      <p>${recipe.description}</p>
      <a href="/">Back</a>
      `;
    document.querySelector('#root').append(recipeEl);

    const editForm = document.querySelector('form');
    editForm.title.value = recipe.title;
    editForm.image.value = recipe.image;
    editForm.description.value = recipe.description;
    // console.log(editForm.description);
  };
  // END NEW
};



const updateRecipe = () => {
  const editForm = document.querySelector('form');
  const urlParams = new URLSearchParams(window.location.search);
  const recipeId = urlParams.get('recipe');

  const updatedRecipe = {
    title: editForm.title.value,
    image: editForm.image.value,
    description: editForm.description.value
  };

  const options = {
    method: 'PUT',
    body: JSON.stringify(updatedRecipe),
    headers: { 'Content-Type': 'application/json' }
  };

  fetch(`api/recipes/${recipeId}`, options)
    .then(response => console.log(response))
    .then(() => location.reload()),
    event.preventDefault();
};