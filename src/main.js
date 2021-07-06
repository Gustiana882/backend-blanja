const express = require('express');

const route = express.Router();
const product = require('./routes/product');
const bag = require('./routes/bag');

route.use('/product', product);
route.use('/bag', bag);

route.use('*', (req, res) => {
  res.status(404).json('not found!');
});

module.exports = route;
