const bags = {};
const model = require('../models/bag');
const response = require('../helpers/response');
const decodeToken = require('../helpers/decode_token');

bags.getAllBag = async (req, res) => {
  try {
    const token = await decodeToken(req.headers.token);
    const getBag = await model.getAllBag(token.user);
    if (getBag.length < 1) {
      response(res, 200, { message: 'empty bag, please choose one product' });
    } else {
      response(res, 200, getBag);
    }
  } catch (error) {
    response(res, 400, error);
  }
};

bags.addBag = async (req, res) => {
  try {
    const token = await decodeToken(req.headers.token);
    const data = {
      product_id: req.body.productId,
      qty: req.body.qty,
      user: token.user,
    };
    const bag = await model.addBag(data);
    if (bag) {
      response(res, 200, { message: 'add data bag success' });
    } else {
      response(res, 400, { message: 'add data bag error' });
    }
  } catch (error) {
    response(res, 400, error);
  }
};

bags.updateBag = async (req, res) => {
  try {
    const getId = await model.getBagById(req.body.id);
    if (getId.error) {
      response(res, 401, getId.message, getId.error);
    } else {
      const data = {
        id: req.body.id,
        qty: req.body.qty,
      };
      const update = await model.updateBag(data);
      if (update > 0) {
        response(res, 200, { message: 'update data bag success' });
      } else {
        response(res, 400, { message: 'update data bag error' });
      }
    }
  } catch (error) {
    response(res, 400, error);
  }
};

bags.deleteBag = async (req, res) => {
  try {
    const getId = await model.getBagById(req.params.id);
    if (!getId) {
      response(res, 401, { message: 'id not found!' }, true);
    } else {
      const delete1 = await model.deleteBag(req.params.id);
      if (delete1 > 0) {
        response(res, 200, { message: 'delete data bag success' });
      } else {
        response(res, 400, { message: 'delete data bag error' }, true);
      }
    }
  } catch (error) {
    response(res, 400, error);
  }
};

module.exports = bags;
