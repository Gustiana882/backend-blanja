const express = require('express');

const route = express.Router();
const controller = require('../controllers/auth');
const upload = require('../middleware/upload');

route.post('/register', upload, controller.register);
route.post('/login', controller.login);

module.exports = route;
