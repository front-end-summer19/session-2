const express = require('express');
const router = express.Router();

router.get('/api/recipes', recipeControllers.findAll);
router.get('/api/recipes/:id', recipeControllers.findById);
router.post('/api/recipes', recipeControllers.add);
router.put('/api/recipes/:id', recipeControllers.update);
router.delete('/api/recipes/:id', recipeControllers.delete);
router.get('/api/import', recipeControllers.import);
router.get('/api/killall', recipeControllers.killall);

module.exports = router;
