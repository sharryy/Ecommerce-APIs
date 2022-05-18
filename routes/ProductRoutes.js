const app = require('express').Router();
const ProductController = require('../controllers/ProductController');

app.post('/', ProductController.createProduct)

module.exports = app;