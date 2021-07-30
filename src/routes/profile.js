const express = require('express');

const route = express.Router();
const controller = require('../controllers/profil');
const images = require('../middleware/images');
const validate = require('../middleware/validate');

route.get('/', validate(['admin', 'user']), controller.getProfil);
route.put('/reset-password', validate(['admin', 'user']), images('profil'), controller.editPassword);
route.put('/edit-profile', validate(['admin', 'user']), images('profil'), controller.editProfil);

module.exports = route;
