/* eslint-disable consistent-return */
const jwt = require('jsonwebtoken');
const respone = require('../helpers/response');

const validate = (role) => (req, res, next) => {
  if (process.env.APP_STATUS === 'test') {
    return next();
  }
  const { token } = req.headers;
  // console.log(token);
  if (!token) {
    respone(res, 401, [], 'you are not login!', true);
  } else {
    jwt.verify(token, process.env.JWT_KEY, (err, decode) => {
      if (err) {
        respone(res, 401, [], err.message, true);
      } else if (role.find((array) => array === decode.roles)) {
        next();
      } else {
        respone(res, 401, [], 'access is not allowed', true);
      }
    });
  }
};

module.exports = validate;
