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
      productId: req.body.productId,
      qty: req.body.qty,
      users: token.user,
    };
    const bag = await model.addBag(data);
    response(res, 200, bag);
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
      const token = await decodeToken(req.headers.token);
      const data = {
        id: req.body.id,
        qty: req.body.qty,
        users: token.user,
      };
      const update = await model.updateBag(data);
      response(res, 200, update);
    }
  } catch (error) {
    response(res, 400, error);
  }
};

bags.deleteBag = async (req, res) => {
  try {
    const getId = await model.getBagById(req.params.id);
    if (getId.error) {
      response(res, 401, getId.message, getId.error);
    } else {
      const delete1 = await model.deleteBag(req.params);
      response(res, 200, delete1);
    }
  } catch (error) {
    response(res, 400, error);
  }
};

module.exports = bags;
