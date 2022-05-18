const app = require('express').Router();
const CategoryController = require('../controllers/CategoryController');

app.post('/', CategoryController.createCategory);

app.get('/', CategoryController.getAllCategories);

module.exports = app;
