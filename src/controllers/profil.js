const profil = {};
const bcr = require('bcrypt');
const model = require('../models/profil');
const response = require('../helpers/response');
const hashPassword = require('../helpers/hash');
const deleteImages = require('../helpers/delete_images');
const decodeToken = require('../helpers/decode_token');

profil.getProfil = async (req, res) => {
  try {
    const decode = await decodeToken(req.headers.token);
    const cekEmail = await model.getUserByEmail(decode.user);
    if (cekEmail.length < 1) {
      response(res, 400, { message: 'e-mail not registered!' }, true);
    } else {
      response(res, 400, cekEmail);
    }
  } catch (error) {
    response(res, 400, error.message);
  }
};

profil.editProfil = async (req, res) => {
  const pathImage = (req.file) ? req.file.path : 'public/images/blank.jpg';
  try {
    const decode = await decodeToken(req.headers.token);
    const cekEmail = await model.getUserByEmail(decode.user);
    if (cekEmail.length < 1) {
      deleteImages(pathImage);
      response(res, 400, { message: 'e-mail not registered!' }, true);
    } else {
      const data = {
        email: decode.user,
        name: req.body.name,
        image: pathImage,
      };
      const result = await model.editProfil(data);
      if (result > 0) {
        deleteImages(cekEmail[0].image);
        response(res, 400, { message: 'edit profil success' });
      }
    }
  } catch (error) {
    deleteImages(pathImage);
    response(res, 400, error.message);
  }
};

profil.editPassword = async (req, res) => {
  try {
    const decode = await decodeToken(req.headers.token);
    const cekEmail = await model.getUserByEmail(decode.user);
    if (cekEmail.length < 1) {
      response(res, 400, { message: 'e-mail not registered!' }, true);
    } else {
      const cekPass = await bcr.compare(req.body.oldPassword, cekEmail[0].password);
      if (cekPass) {
        const data = {
          email: decode.user,
          password: await hashPassword(req.body.newPassword),
        };
        const result = await model.editPassword(data);
        if (result > 0) {
          response(res, 400, { message: 'edit password success' });
        }
      } else {
        response(res, 400, { message: 'error password wrong!' }, true);
      }
    }
  } catch (error) {
    response(res, 400, error.message);
  }
};

module.exports = profil;
