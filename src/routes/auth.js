const express = require('express');

const route = express.Router();
const controller = require('../controllers/auth');
const images = require('../middleware/images');

route.post('/register', images('profil'), controller.register);
route.post('/login', controller.login);

module.exports = route;
