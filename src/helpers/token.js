const jwt = require('jsonwebtoken');

const createToken = async (email, roles) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const payload = {
      user: email,
      roles,
    };
    const token = jwt.sign(payload, process.env.JWT_KEY, { expiresIn: '1d' });
    return token;
  } catch (error) {
    throw error;
  }
};

module.exports = createToken;
