const express = require('express');

const route = express.Router();
const controller = require('../controllers/auth');
// const images = require('../middleware/images');

route.post('/register/:roles', controller.register);
route.post('/login/:roles', controller.login);

module.exports = route;
