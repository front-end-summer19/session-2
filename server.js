const express = require('express');
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload');
const recipeModel = require('./api/recipe.model');
const recipeControllers = require('./api/recipe.controllers');
const app = express();

require('dotenv').config();

app.use(express.static('public'));
app.use(fileUpload());
app.use(express.urlencoded({ extended: false }));
app.use(express.json({ extended: false }));

const dataBaseURL = process.env.DATABASE;
// const dataBaseURL =
//   'mongodb+srv://daniel:dd2345@recipes-3k4ea.mongodb.net/test?retryWrites=true&w=majority';

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/public/index.html');
});

app.get('/api/recipes', recipeControllers.findAll);
app.get('/api/recipes/:id', recipeControllers.findById);
app.post('/api/recipes', recipeControllers.add);
app.put('/api/recipes/:id', recipeControllers.update);
app.delete('/api/recipes/:id', recipeControllers.delete);
app.get('/api/import', recipeControllers.import);
app.get('/api/killall', recipeControllers.killall);
app.post('/api/upload', recipeControllers.upload);



mongoose
  .connect(dataBaseURL, { useNewUrlParser: true })
  .then(() => console.log('MongoDb connected'))
  .catch(err => console.log(err));

  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Server running at port ${PORT}`));
