const express = require('express');

const route = express.Router();
const product = require('./routes/product');
const bag = require('./routes/bag');
const auth = require('./routes/auth');
const profil = require('./routes/profil');
const log = require('./middleware/log_requests');

route.use('*', log.requests);
route.use('/', auth);
route.use('/profil', profil);
route.use('/product', product);
route.use('/bag', bag);

route.use('*', (req, res) => {
  res.status(404).json('not found!');
});

module.exports = route;
