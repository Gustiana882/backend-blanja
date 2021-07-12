const express = require('express');

const route = express.Router();
const product = require('./routes/product');
const bag = require('./routes/bag');
const auth = require('./routes/auth');
const log = require('./middleware/log_requests');
const { cloudConfig } = require('./configs/cloudinary');

route.use('*', log.requests);
route.use('*', cloudConfig);
route.use('/', auth);
route.use('/product', product);
route.use('/bag', bag);

route.use('*', (req, res) => {
  res.status(404).json('not found!');
});

module.exports = route;
