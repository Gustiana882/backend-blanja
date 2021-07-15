/* eslint-disable no-else-return */
/* eslint-disable no-console */
/* eslint-disable no-undef */
const response = require('../helpers/response');
const { redisDb } = require('../configs/redis');

const getAll = (key) => (req, res, next) => {
  redisDb.get(key, (err, data) => {
    if (err) {
      return response(res, 500, err, true);
    } else if (data !== null) {
      console.log('data redis');
      result = JSON.parse(data);
      return response(res, 200, result);
    } else {
      return next();
    }
  });
};

module.exports = getAll;
