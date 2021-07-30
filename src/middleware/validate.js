/* eslint-disable consistent-return */
const jwt = require('jsonwebtoken');
const respone = require('../helpers/response');

const validate = (role) => (req, res, next) => {
  if (process.env.APP_STATUS === 'test') {
    return next();
  }
  const { token } = req.headers;
  if (!token) {
    respone(res, 401, { message: 'you are not login!' });
  } else {
    jwt.verify(token, process.env.JWT_KEY, (err, decode) => {
      if (err) {
        respone(res, 401, err, true);
      } else if (role.find((array) => array === decode.roles)) {
        next();
      } else {
        respone(res, 401, { message: 'access is not allowed' }, true);
      }
    });
  }
};

module.exports = validate;
