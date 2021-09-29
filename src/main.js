const express = require('express');

const route = express.Router();
const product = require('./routes/product');
const bag = require('./routes/bag');
const auth = require('./routes/auth');
const profile = require('./routes/profile');
const log = require('./middleware/log_requests');
const { cloudConfig } = require('./configs/cloudinary');

route.use('*', cloudConfig, log.requests);
route.use('/', auth);
route.use('/profile', profile);
route.use('/product', product);
route.use('/bag', bag);

route.use('*', (req, res) => {
  res.status(404).json('page not found!');
});

module.exports = route;
