/* eslint-disable consistent-return */
const bags = {};
const model = require('../models/bag');
const response = require('../helpers/response');
const decodeToken = require('../helpers/decode_token');

bags.getAllBag = async (req, res) => {
  try {
    const token = await decodeToken(req.headers.token);
    const getBag = await model.getAllBag(token.user);
    if (getBag.length < 1) {
      response(res, 200, [], 'empty bag, please choose one product');
    } else {
      response(res, 200, getBag);
    }
  } catch (error) {
    response(res, 400, [], error.message, true);
  }
};

bags.addBag = async (req, res) => {
  try {
    let result;
    const token = await decodeToken(req.headers.token);
    const getBag = await model.getAllBag(token.user);
    if (getBag.find((product) => product.product_id === req.body.productId)) {
      const data = {
        id: getBag[0].id,
        qty: Number(getBag[0].qty) + Number(req.body.qty),
      };
      result = await model.updateBag(data);
    } else {
      const data = {
        product_id: req.body.productId,
        qty: req.body.qty,
        user: token.user,
      };
      result = await model.addBag(data);
    }
    if (result) {
      response(res, 200, [], 'add data bag success');
    } else {
      response(res, 200, [], 'add data bag error', true);
    }
  } catch (error) {
    response(res, 400, [], error.message, true);
  }
};

bags.updateBag = async (req, res) => {
  try {
    const data = {
      id: req.body.id,
      qty: req.body.qty,
    };
    const update = await model.updateBag(data);
    if (update > 0) {
      response(res, 200, [], 'update data bag success');
    } else {
      response(res, 400, [], 'update data bag error', true);
    }
  } catch (error) {
    response(res, 500, { message: error.message }, true);
  }
};

bags.deleteBag = async (req, res) => {
  try {
    const getId = await model.getBagById(req.params.id);
    if (!getId) {
      response(res, 401, [], 'id not found!', true);
    } else {
      const delete1 = await model.deleteBag(req.params.id);
      if (delete1 > 0) {
        response(res, 200, [], 'delete data bag success');
      } else {
        response(res, 400, [], 'delete data bag error', true);
      }
    }
  } catch (error) {
    response(res, 500, [], error.message, true);
  }
};

module.exports = bags;
