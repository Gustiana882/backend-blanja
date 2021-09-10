/* eslint-disable consistent-return */
const jwt = require('jsonwebtoken');

const decodeToken = (token) => new Promise((resolve, reject) => {
  jwt.verify(token, process.env.JWT_KEY, (err, decode) => {
    if (err) {
      reject(err);
    } else {
      resolve({ user: decode.user, role: decode.roles });
    }
  });
});

module.exports = decodeToken;
