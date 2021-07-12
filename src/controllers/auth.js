const auth = {};
const bcr = require('bcrypt');
const model = require('../models/auth');
const response = require('../helpers/response');
const hashPassword = require('../helpers/hash');
const createToken = require('../helpers/token');
const deleteImages = require('../helpers/delete_images');

auth.register = async (req, res) => {
  try {
    const cekEmail = await model.getUserByEmail(req.body.email);
    if (cekEmail.length > 0) {
      response(res, 200, { message: 'e-mail already registered' });
      deleteImages(req.file.path);
    } else {
      const data = {
        name: req.body.name,
        email: req.body.email,
        password: await hashPassword(req.body.password),
        roles: req.body.roles,
        image: req.file.path,
      };
      const register = await model.register(data);
      if (register > 0) {
        response(res, 200, { message: 'register success' });
      }
    }
  } catch (error) {
    response(res, 400, error.message);
  }
};

auth.login = async (req, res) => {
  try {
    const cekEmail = await model.getUserByEmail(req.body.email);
    if (cekEmail.length < 1) {
      response(res, 400, { message: 'e-mail not registered!' }, true);
    } else {
      const cekPass = await bcr.compare(req.body.password, cekEmail[0].password);
      if (cekPass) {
        const token = await createToken(cekEmail[0].email, cekEmail[0].roles);
        response(res, 400, {
          message: 'login berhasil!',
          token_key: token,
        });
      } else {
        response(res, 400, { message: 'error login gagal!' }, true);
      }
    }
  } catch (error) {
    response(res, 400, error.message);
  }
};

module.exports = auth;
