const profil = {};
const bcr = require('bcrypt');
const customer = require('../models/customer');
const response = require('../helpers/response');
const hashPassword = require('../helpers/hash');
const deleteImages = require('../helpers/delete_images');
const decodeToken = require('../helpers/decode_token');

profil.getProfilCustomer = async (req, res) => {
  try {
    const decode = await decodeToken(req.headers.token);
    const cekEmail = await customer.getCustomerByEmail(decode.user);
    if (cekEmail.length < 1) {
      response(res, 200, [], 'e-mail not registered!', true);
    } else {
      response(res, 200, [cekEmail]);
    }
  } catch (error) {
    response(res, 500, [], error.message, true);
  }
};

profil.editProfil = async (req, res) => {
  const pathImage = (req.file) ? req.file.path : 'public/images/blank.jpg';
  try {
    const decode = await decodeToken(req.headers.token);
    const cekEmail = await customer.getCustomerByEmail(decode.user);
    if (cekEmail.length < 1) {
      deleteImages(pathImage);
      response(res, 200, [], 'e-mail not registered!', true);
    } else {
      const data = {
        email: decode.user,
        name: req.body.name,
        image: (req.file) ? req.file.path : cekEmail.image,
        phone: req.body.phone,
        address: req.body.address,
        gender: req.body.gender || '',
        dateBirth: req.body.dateBirth || '',
      };
      const result = await customer.updateProfile(data);
      if (result > 0 && req.file) {
        deleteImages(cekEmail.image);
        response(res, 200, [], 'edit profil success');
      } else {
        response(res, 200, [], 'edit profil success');
      }
    }
  } catch (error) {
    deleteImages(pathImage);
    response(res, 500, [], error.message, true);
  }
};

profil.editPassword = async (req, res) => {
  try {
    const decode = await decodeToken(req.headers.token);
    const cekEmail = await customer.getCustomerByEmail(decode.user);
    if (cekEmail.length < 1) {
      response(res, 200, [], 'e-mail not registered!', true);
    } else {
      const cekPass = await bcr.compare(req.body.oldPassword, cekEmail.password);
      if (cekPass) {
        const data = {
          email: decode.user,
          password: await hashPassword(req.body.newPassword),
        };
        const result = await customer.resetPassword(data);
        if (result > 0) {
          response(res, 200, [], 'edit password success');
        }
      } else {
        response(res, 401, [], 'error password wrong!', true);
      }
    }
  } catch (error) {
    response(res, 500, [], error.message);
  }
};

module.exports = profil;
