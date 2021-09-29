/* eslint-disable consistent-return */
const category = {};
const model = require('../models/category');
const response = require('../helpers/response');
const { redisDb } = require('../configs/redis');
const deleteImages = require('../helpers/delete_images');
const nullValidator = require('../helpers/null_validator');
const upload = require('../helpers/uploud_cloud');

category.getAllCategory = async (req, res) => {
  try {
    const allCategory = await model.getAllCategory();
    redisDb.setex('category', 60, JSON.stringify(allCategory));
    response(res, 200, allCategory);
  } catch (error) {
    response(res, 500, [], error.message, true);
  }
};

category.addCategory = async (req, res) => {
  const pathImage = (req.file) ? req.file.path : 'public/images/blank.jpg';
  try {
    if (!nullValidator(req.body, ['image', 'id'])) {
      deleteImages(pathImage);
      return response(res, 200, [], 'check the input data is not empty', true);
    }
    const cekId = await model.getCategoryByName(req.body.name);
    if (cekId) {
      deleteImages(pathImage);
      response(res, 200, [], 'category name already exists', true);
    } else {
      const data = {
        name: req.body.name,
        image: await upload('category', pathImage),
      };
      const allCategory = await model.addCategory(data);
      redisDb.del('category');
      deleteImages(pathImage);
      if (allCategory) {
        response(res, 200, [], 'add categories is success');
      } else {
        response(res, 400, [], 'add categories is error', true);
      }
    }
  } catch (error) {
    deleteImages(pathImage);
    response(res, 500, [], pathImage, true);
  }
};

category.updateCategory = async (req, res) => {
  const pathImage = (req.file) ? req.file.path : 'public/images/blank.jpg';
  try {
    if (!nullValidator(req.body, ['image'])) {
      return response(res, 200, [], 'check the input data is not empty', true);
    }
    const cekId = await model.getCategoryById(req.body.id);
    if (!cekId) {
      deleteImages(pathImage);
      response(res, 401, [], 'category id not found', true);
    } else {
      const data = {
        id: req.body.id,
        name: req.body.name,
        image: (req.file) ? await upload('category', pathImage) : cekId.image,
      };
      const update = await model.updateCategory(data);
      deleteImages(pathImage);
      redisDb.del('category');
      if (update > 0) {
        response(res, 200, [], 'edit category is success');
      } else {
        response(res, 400, [], 'edit category is error', true);
      }
    }
  } catch (error) {
    deleteImages(pathImage);
    response(res, 500, [], error.message, true);
  }
};

category.deleteCategory = async (req, res) => {
  try {
    const getId = await model.getCategoryById(req.params.id);
    if (!getId) {
      response(res, 401, [], 'category id not found!', true);
    } else {
      const respons = await model.deleteCategory(req.params.id);
      // deleteImages(getId.image);
      redisDb.del('category');
      redisDb.del('product');
      if (respons > 0) {
        response(res, 200, [], 'category success to delete');
      } else {
        response(res, 400, [], 'category error to delete', true);
      }
    }
  } catch (error) {
    response(res, 500, [], error.message, true);
  }
};

module.exports = category;
