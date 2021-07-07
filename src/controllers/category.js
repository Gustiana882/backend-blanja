const category = {};
const model = require('../models/category');
const response = require('../helpers/response');

category.getAllCategory = async (req, res) => {
  try {
    const allCategory = await model.getAllCategory();
    response(res, 200, allCategory);
  } catch (error) {
    response(res, 400, error);
  }
};

category.addCategory = async (req, res) => {
  try {
    const allCategory = await model.addCategory(req.body);
    response(res, 200, allCategory);
  } catch (error) {
    response(res, 400, error);
  }
};

category.updateCategory = async (req, res) => {
  try {
    const getId = await model.getCategoryById(req.body.id);
    if (getId.error) {
      response(res, 401, getId, getId.error);
    } else {
      const update = await model.updateCategory(req.body);
      response(res, 200, update);
    }
  } catch (error) {
    response(res, 400, error);
  }
};

category.deleteCategory = async (req, res) => {
  try {
    const getId = await model.getCategoryById(req.body.id);
    if (getId.error) {
      response(res, 401, getId, getId.error);
    } else {
      const respons = await model.deleteCategory(req.body);
      response(res, 200, respons);
    }
  } catch (error) {
    response(res, 400, error);
  }
};

module.exports = category;
