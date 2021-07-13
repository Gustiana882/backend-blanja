const express = require('express');

const route = express.Router();
const controller = require('../controllers/profil');
const images = require('../middleware/images');
const validate = require('../middleware/validate');

route.get('/', validate(['admin', 'user']), controller.getProfil);
route.post('/reset-password', validate(['admin', 'user']), images('profil'), controller.editPassword);
route.post('/edit-profil', validate(['admin', 'user']), images('profil'), controller.editProfil);

module.exports = route;
