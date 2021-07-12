const bags = {};
const model = require('../models/bag');
const response = require('../helpers/response');

bags.getAllBag = async (req, res) => {
  try {
    const getBag = await model.getAllBag();
    if (getBag.length < 1) {
      response(res, 200, { message: 'empty bag, please choose one product' });
    }
    response(res, 200, getBag);
  } catch (error) {
    response(res, 400, error);
  }
};

bags.addBag = async (req, res) => {
  try {
    const bag = await model.addBag(req.body);
    response(res, 200, bag);
  } catch (error) {
    response(res, 400, error);
  }
};

bags.updateBag = async (req, res) => {
  try {
    const update = await model.updateBag(req.body);
    response(res, 200, update);
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
