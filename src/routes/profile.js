const express = require('express');

const route = express.Router();
const customer = require('../controllers/customerProfile');
const seller = require('../controllers/sellerProfile');
const images = require('../middleware/images');
const validate = require('../middleware/validate');

route.get('/customer', validate(['customer']), customer.getProfilCustomer);
route.get('/seller', validate(['seller']), seller.getProfilSeller);
route.put('/customer/edit-profile', validate(['customer']), images('profil'), customer.editProfil);
route.put('/seller/edit-profile', validate(['seller']), images('profil'), seller.editProfil);
route.put('/customer/edit-password', validate(['customer']), images('profil'), customer.editPassword);
route.put('/seller/edit-password', validate(['seller']), images('profil'), seller.editPassword);

module.exports = route;
