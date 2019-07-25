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
    <a class="del" data-id=${recipe._id} href="#">Delete</a>
    `;
    document.querySelector('#root').append(recipeEl);
  });

  const deleteBtns = document.querySelectorAll('.del');
  // console.log(deleteBtns);
  const delBtns = Array.from(deleteBtns);
  console.log('delBtns', delBtns);
  delBtns.forEach(btn => {
    btn.addEventListener('click', e => {
      fetch(`api/recipes/${btn.dataset.id}`, {
        method: 'DELETE'
      });
      e.preventDefault();
      location.reload();
    });
  });

};