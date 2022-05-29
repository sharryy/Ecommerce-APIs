const app = require('express').Router();
const ProductController = require('../controllers/ProductController');

app.post('/', ProductController.createProduct);

app.get('/show', ProductController.getAllProducts);

app.get('/:id', ProductController.getProductById);

module.exports = app;