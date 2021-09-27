const express = require('express');

const route = express.Router();
const controller = require('../controllers/product');
const category = require('../controllers/category');
const validate = require('../middleware/validate');
const redis = require('../middleware/cache');
const images = require('../middleware/images');

route.get('/category', redis('category'), category.getAllCategory);
route.post('/category', images('category'), category.addCategory);
route.put('/category', validate(['seller']), images('category'), category.updateCategory);
route.delete('/category/:id', validate(['seller']), category.deleteCategory);

route.get('/search', controller.searchProduct);
route.get('/filter', controller.fiter);

route.get('/my-product', validate(['seller']), controller.getAllMyProduct);
route.get('/', redis('product'), controller.getAllProduct);
route.put('/edit-stock', validate(['seller']), controller.editStock);
route.post('/', validate(['seller']), images('product'), controller.addProduct);
route.put('/', validate(['seller']), images('product'), controller.updateProduct);
route.delete('/:id', validate(['seller']), controller.deleteProduct);
route.get('/:id', controller.getProductByName);

module.exports = route;
