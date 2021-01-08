const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RecipeSchema = new Schema({
  title: String,
  description: String,
  image: String,
});

const recipeModel = mongoose.model('Recipe', RecipeSchema);

module.exports = recipeModel;
