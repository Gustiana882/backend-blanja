const bags = {};
const model = require('../models/bag');
const response = require('../helpers/response');

bags.getAllBag = async (req, res) => {
  try {
    const getBag = await model.getAllBag();
    const json = getBag.map((bag) => {
      const totalPrice = bag.qty * bag.price;
      const object = {
        id: bag.id,
        product_id: bag.product_id,
        product_title: bag.title,
        product_store: bag.store,
        product_price: bag.price,
        qty: bag.qty,
        total_price: totalPrice,
        create_at: bag.create_at,
      };
      return object;
    });
    response(res, 200, json);
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
