const app = require('express').Router();
const ProductController = require('../controllers/ProductController');

app.post('/', ProductController.createProduct);

app.get('/', ProductController.getAllProducts);

module.exports = app;