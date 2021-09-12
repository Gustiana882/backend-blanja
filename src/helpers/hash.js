const bc = require('bcrypt');

const hashPassword = async (password) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const salt = await bc.genSalt(10);
    const result = await bc.hash(password, salt);
    return result;
  } catch (error) {
    throw error;
  }
};

module.exports = hashPassword;
