const express = require('express');
const redis = require('../middleware/cache');

const route = express.Router();
const controller = require('../controllers/bag');
const validate = require('../middleware/validate');

route.get('/', validate(['customer']), redis('bag'), controller.getAllBag);
route.post('/', validate(['customer']), controller.addBag);
route.put('/', validate(['customer']), controller.updateBag);
route.delete('/:id', validate(['customer']), controller.deleteBag);

module.exports = route;
