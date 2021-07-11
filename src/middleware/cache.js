/* eslint-disable no-undef */
const response = require('../helpers/response');
const { redisDb } = require('../configs/redis');

const getAll = (req, res, next) => {
  redisDb.get('product', (err, data) => {
    if (err) {
      response(res, 500, err, true);
    } else if (data !== null) {
      console.log('data redis');
      result = JSON.parse(data);
      response(res, 200, result);
    } else {
      next();
    }
  });
};

module.exports = getAll;
