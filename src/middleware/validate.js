const jwt = require('jsonwebtoken');
const respone = require('../helpers/response');

const checkToken = (role) => (req, res, next) => {
  const { token } = req.headers;
  if (!token) {
    respone(res, 401, { message: 'you are not login!' });
  } else {
    jwt.verify(token, process.env.JWT_KEY, (err, decode) => {
      const cekRole = role.find((array) => array === decode.roles);
      if (err) {
        respone(res, 401, err, true);
      } else if (cekRole) {
        next();
      } else {
        respone(res, 401, { message: 'access is not allowed' }, true);
      }
    });
  }
};

module.exports = checkToken;
