const express = require('express');

const route = express.Router();
const controller = require('../controllers/product');
const category = require('../controllers/category');
const validate = require('../middleware/validate');
const redis = require('../middleware/cache');

route.get('/', validate('admin'), redis, controller.getAllProduct);
route.post('/', controller.addProduct);
route.delete('/:id', controller.deleteProduct);
route.put('/', controller.updateProduct);

route.get('/category', category.getAllCategory);
route.post('/category', category.addCategory);
route.put('/category', category.updateCategory);
route.delete('/category/:id', category.deleteCategory);

route.get('/search', controller.searchProduct);
route.get('/filter', controller.fiter);

module.exports = route;
