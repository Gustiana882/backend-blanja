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
      response(res, 400, [], 'e-mail already registered', true);
    } else {
      const data = {
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        password: await hashPassword(req.body.password),
        roles: 'user',
        image: pathImage,
        address: req.body.address,
      };
      const register = await model.register(data);
      if (register) {
        response(res, 200, [], 'register success');
      } else {
        response(res, 400, [], 'register gagal', true);
      }
    }
  } catch (error) {
    response(res, 500, [], error.message, true);
  }
};

auth.login = async (req, res) => {
  try {
    const cekEmail = await model.getUserByEmail(req.body.email);
    if (!cekEmail) {
      response(res, 200, [], 'e-mail not registered!', true);
    } else {
      const cekPass = await bcr.compare(req.body.password, cekEmail.password);
      if (cekPass) {
        const token = await createToken(cekEmail.email, cekEmail.roles);
        response(res, 200, { token_key: token, image: cekEmail.image }, 'login berhasil!');
      } else {
        response(res, 200, [], 'login gagal!', true);
      }
    }
  } catch (error) {
    response(res, 500, [], error.message, true);
  }
};

module.exports = auth;
