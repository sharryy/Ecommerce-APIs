const app = require('express').Router();
const CategoryController = require('../controllers/CategoryController');

app.post('/', CategoryController.createCategory);

app.get('/show', CategoryController.getAllCategories);

app.get('/:id', CategoryController.getProductsOfCategory);

module.exports = app;
