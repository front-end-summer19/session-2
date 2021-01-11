const express = require('express');
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload');

const recipeModel = require('./api/recipe.model');
const recipeControllers = require('./api/recipe.controllers');

// const recipesApi = require('./api/api.js');

// const square = require('./api/square');
// console.log('The area of a square with a width of 4 is ' + square.area(4));

const app = express();

const connectionString = 'mongodb://localhost:27017';

app.use(express.static('public'));
app.use(fileUpload());

app.use(express.json({ extended: false }));
app.use(express.urlencoded({ extended: false }));

app.get('/api/recipes', recipeControllers.findAll);
app.get('/api/recipes/:id', recipeControllers.findById);
app.post('/api/recipes', recipeControllers.add);
app.put('/api/recipes/:id', recipeControllers.update);
app.delete('/api/recipes/:id', recipeControllers.delete);
app.get('/api/import', recipeControllers.import);
app.get('/api/killall', recipeControllers.killall);
app.post('/api/upload', recipeControllers.upload);

mongoose
  .connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('MongoDb connected'))
  .catch((err) => console.log(err));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () =>
  console.log(`Server running at http://localhost:${PORT}`),
);
