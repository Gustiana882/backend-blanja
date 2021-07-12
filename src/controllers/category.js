const category = {};
const model = require('../models/category');
const response = require('../helpers/response');
const { redisDb } = require('../configs/redis');

category.getAllCategory = async (req, res) => {
  try {
    const allCategory = await model.getAllCategory();
    redisDb.setex('category', 60, JSON.stringify(allCategory));
    response(res, 200, allCategory);
  } catch (error) {
    response(res, 400, error);
  }
};

category.addCategory = async (req, res) => {
  try {
    const data = {
      name: req.body.name,
      image: req.file.path,
    };
    const allCategory = await model.addCategory(data);
    redisDb.del('category');
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
      const data = {
        id: req.body.id,
        name: req.body.name,
        image: req.file.path,
      };
      const update = await model.updateCategory(data);
      redisDb.del('category');
      response(res, 200, update);
    }
  } catch (error) {
    response(res, 400, error);
  }
};

category.deleteCategory = async (req, res) => {
  try {
    const getId = await model.getCategoryById(req.params.id);
    if (getId.error) {
      response(res, 401, getId.message, getId.error);
    } else {
      const respons = await model.deleteCategory(req.params);
      redisDb.del('category');
      response(res, 200, respons);
    }
  } catch (error) {
    response(res, 400, error);
  }
};

module.exports = category;
