const category = {};
const model = require('../models/category');
const response = require('../helpers/response');
const { redisDb } = require('../configs/redis');
const deleteImages = require('../helpers/delete_images');

category.getAllCategory = async (req, res) => {
  try {
    const allCategory = await model.getAllCategory();
    redisDb.setex('category', 60, JSON.stringify(allCategory));
    response(res, 200, allCategory);
  } catch (error) {
    response(res, 400, { message: error.message }, true);
  }
};

category.addCategory = async (req, res) => {
  const pathImage = (req.file) ? req.file.path : 'public/images/blank.jpg';
  try {
    const data = {
      name: req.body.name,
      image: pathImage,
    };
    const allCategory = await model.addCategory(data);
    redisDb.del('category');
    if (allCategory) {
      response(res, 200, { message: 'add categories is success' });
    } else {
      response(res, 400, { message: 'add categories is error' }, true);
    }
  } catch (error) {
    deleteImages(pathImage);
    response(res, 400, error);
  }
};

category.updateCategory = async (req, res) => {
  const pathImage = (req.file) ? req.file.path : 'public/images/blank.jpg';
  try {
    const cekId = await model.getCategoryById(req.body.id);
    if (!cekId) {
      deleteImages(pathImage);
      response(res, 401, { message: 'category id not found' }, true);
    } else {
      const data = {
        id: req.body.id,
        name: req.body.name,
        image: pathImage,
      };
      const update = await model.updateCategory(data);
      deleteImages(cekId.image);
      redisDb.del('category');
      if (update > 0) {
        response(res, 200, { message: 'edit category is success' });
      } else {
        response(res, 400, { message: 'edit category is error' }, true);
      }
    }
  } catch (error) {
    deleteImages(pathImage);
    response(res, 400, error);
  }
};

category.deleteCategory = async (req, res) => {
  try {
    const getId = await model.getCategoryById(req.params.id);
    if (!getId) {
      response(res, 401, { message: 'category id not found!' }, true);
    } else {
      const respons = await model.deleteCategory(req.params.id);
      deleteImages(getId.image);
      redisDb.del('category');
      redisDb.del('product');
      if (respons > 0) {
        response(res, 200, { message: 'category success to delete' });
      } else {
        response(res, 400, { message: 'category error to delete' }, true);
      }
    }
  } catch (error) {
    response(res, 400, error);
  }
};

module.exports = category;
