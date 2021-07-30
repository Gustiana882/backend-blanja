const auth = {};
const bcr = require('bcrypt');
const model = require('../models/user');
const response = require('../helpers/response');
const hashPassword = require('../helpers/hash');
const createToken = require('../helpers/token');
const deleteImages = require('../helpers/delete_images');

auth.register = async (req, res) => {
  const pathImage = (req.file) ? req.file.path : 'public/images/blank.jpg';
  try {
    const cekEmail = await model.getUserByEmail(req.body.email);
    if (cekEmail) {
      deleteImages(pathImage);
      response(res, 400, { message: 'e-mail already registered' }, true);
    } else {
      const data = {
        name: req.body.name,
        email: req.body.email,
        password: await hashPassword(req.body.password),
        roles: 'admin',
        image: pathImage,
      };
      const register = await model.register(data);
      if (register) {
        response(res, 200, { message: 'register success' });
      } else {
        response(res, 400, { message: 'register gagal' }, true);
      }
    }
  } catch (error) {
    response(res, 400, error.message);
  }
};

auth.login = async (req, res) => {
  try {
    const cekEmail = await model.getUserByEmail(req.body.email);
    if (!cekEmail) {
      response(res, 400, { message: 'e-mail not registered!' }, true);
    } else {
      const cekPass = await bcr.compare(req.body.password, cekEmail.password);
      if (cekPass) {
        const token = await createToken(cekEmail.email, cekEmail.roles);
        response(res, 200, {
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
