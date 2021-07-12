const express = require('express');
const redis = require('../middleware/cache');

const route = express.Router();
const controller = require('../controllers/bag');
const validate = require('../middleware/validate');

route.get('/', validate(['admin', 'user']), redis('bag'), controller.getAllBag);
route.post('/', validate(['admin', 'user']), controller.addBag);
route.put('/', validate(['admin', 'user']), controller.updateBag);
route.delete('/:id', validate(['admin', 'user']), controller.deleteBag);

module.exports = route;
