/* eslint-disable class-methods-use-this */
/* eslint-disable consistent-return */
const bcr = require('bcrypt');
const customer = require('../models/customer');
const seller = require('../models/seller');
const response = require('../helpers/response');
const hashPassword = require('../helpers/hash');
const createToken = require('../helpers/token');
// const deleteImages = require('../helpers/delete_images');

class Auth {
  customer = async (req) => {
    try {
      const cekEmail = await customer.getCustomerByEmail(req.body.email);
      if (cekEmail) {
        return 'e-mail already registered';
      }
      const data = {
        name: req.body.name,
        email: req.body.email,
        password: await hashPassword(req.body.password),
        roles: 'customer',
        image: 'public/images/blank.jpg',
      };
      const register = await customer.register(data);
      if (register) {
        return 'register success';
      }
      return 'register gagal';
    } catch (error) {
      return error.message;
    }
  }

  seller = async (req) => {
    try {
      const cekEmail = await seller.getSellerByEmail(req.body.email);
      if (cekEmail) {
        return 'e-mail already registered';
      }
      const data = {
        name: req.body.name,
        email: req.body.email,
        password: await hashPassword(req.body.password),
        store: req.body.store,
        roles: 'seller',
        phone: req.body.phone,
        image: 'public/images/blank.jpg',
      };
      const register = await seller.register(data);
      if (register) {
        return 'register success';
      }
      return 'register gagal';
    } catch (error) {
      return error.message;
    }
  }

  register = async (req, res) => {
    if (req.params.roles === 'customer') {
      const result = await this.customer(req);
      return response(res, 200, [], result);
    }
    if (req.params.roles === 'seller') {
      const result = await this.seller(req);
      return response(res, 200, [], result);
    }
  }

  loginCustomer = async (req, res) => {
    try {
      const cekEmail = await customer.getCustomerByEmail(req.body.email);
      if (!cekEmail) {
        return response(res, 200, [], 'e-mail not registered!', true);
      } else {
        const cekPass = await bcr.compare(req.body.password, cekEmail.password);
        if (cekPass) {
          const token = await createToken(cekEmail.email, cekEmail.roles);
          return response(res, 200, { token_key: token }, 'login berhasil!');
        } else {
          return response(res, 200, [], 'login gagal!', true);
        }
      }
    } catch (error) {
      return response(res, 500, [], error.message, true);
    }
  }

  loginSeller = async (req, res) => {
    try {
      const cekEmail = await seller.getSellerByEmail(req.body.email);
      if (!cekEmail) {
        return response(res, 200, [], 'e-mail not registered!', true);
      } else {
        const cekPass = await bcr.compare(req.body.password, cekEmail.password);
        if (cekPass) {
          const token = await createToken(cekEmail.email, cekEmail.roles);
          return response(res, 200, { token_key: token }, 'login berhasil!');
        } else {
          return response(res, 200, [], 'login gagal!', true);
        }
      }
    } catch (error) {
      return response(res, 500, [], error.message, true);
    }
  }

  login = async (req, res) => {
    if (req.params.roles === 'customer') {
      const result = await this.loginCustomer(req, res);
      return result;
    }
    if (req.params.roles === 'seller') {
      const result = await this.loginSeller(req, res);
      return result;
    }
  }
}

module.exports = new Auth();
