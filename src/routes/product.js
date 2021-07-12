const express = require('express');

const route = express.Router();
const controller = require('../controllers/product');
const category = require('../controllers/category');
const validate = require('../middleware/validate');
const redis = require('../middleware/cache');
const images = require('../middleware/images');

route.get('/', redis('product'), controller.getAllProduct);
route.post('/', validate(['admin']), images('product'), controller.addProduct);
route.put('/', validate(['admin']), images('product'), controller.updateProduct);
route.delete('/:id', validate(['admin']), controller.deleteProduct);

route.get('/category', redis('category'), category.getAllCategory);
route.post('/category', validate(['admin']), images('category'), category.addCategory);
route.put('/category', validate(['admin']), images('category'), category.updateCategory);
route.delete('/category/:id', validate(['admin']), category.deleteCategory);

route.get('/search', controller.searchProduct);
route.get('/filter', controller.fiter);

module.exports = route;
