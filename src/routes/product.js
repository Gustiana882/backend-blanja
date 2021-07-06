const express = require('express');

const route = express.Router();
const controller = require('../controllers/product');
const category = require('../controllers/category');

route.get('/', controller.getAllProduct);
route.post('/', controller.addProduct);
route.delete('/', controller.deleteProduct);
route.put('/', controller.updateProduct);

route.get('/category', category.getAllCategory);
route.post('/category', category.addCategory);
route.put('/category', category.updateCategory);
route.delete('/category', category.deleteCategory);

route.get('/search', controller.searchProduct);
route.get('/filter', controller.fiter);

module.exports = route;
