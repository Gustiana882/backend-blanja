const products = {};
const model = require('../models/product');
const categorymodel = require('../models/category');
const response = require('../helpers/response');
const { redisDb } = require('../configs/redis');
const deleteImages = require('../helpers/delete_images');

products.getAllProduct = async (req, res) => {
  try {
    const allProduct = await model.getAllProduct();
    redisDb.setex('product', 60, JSON.stringify(allProduct));
    // console.log('controller product');
    response(res, 200, allProduct);
  } catch (error) {
    response(res, 400, error);
  }
};

products.addProduct = async (req, res) => {
  try {
    const category = await categorymodel.getCategoryById(req.body.category);
    if (category.error) {
      deleteImages(req.file.path);
      response(res, 401, category);
    } else {
      const data = {
        title: req.body.title,
        category: req.body.category,
        price: req.body.price,
        store: req.body.store,
        review: req.body.review,
        star: req.body.star,
        image: req.file.path,
      };
      const respons = await model.addProduct(data);
      redisDb.del('product');
      response(res, 200, respons);
    }
  } catch (error) {
    deleteImages(req.file.path);
    response(res, 400, error);
  }
};

products.updateProduct = async (req, res) => {
  try {
    const cekid = await model.getProductById(req.body.id);
    if (cekid.error) {
      deleteImages(req.file.path);
      response(res, 401, cekid);
    } else {
      const data = {
        id: req.body.id,
        title: req.body.title,
        category: req.body.category,
        price: req.body.price,
        store: req.body.store,
        review: req.body.review,
        star: req.body.star,
        image: req.file.path,
      };
      const respons = await model.updateProduct(data);
      deleteImages(cekid[0].image);
      redisDb.del('product');
      response(res, 200, respons);
    }
  } catch (error) {
    deleteImages(req.file.path);
    response(res, 400, error);
  }
};

products.deleteProduct = async (req, res) => {
  try {
    const cekid = await model.getProductById(req.params.id);
    if (cekid.error) {
      response(res, 401, cekid.message, cekid.error);
    } else {
      const respons = await model.deleteProduct(req.params);
      deleteImages(cekid[0].image);
      redisDb.del('product');
      response(res, 200, respons);
    }
  } catch (error) {
    response(res, 400, error);
  }
};

products.searchProduct = async (req, res) => {
  try {
    const searchProduct = await model.searchProduct(req.query);
    if (searchProduct.length > 0) {
      response(res, 200, searchProduct);
    } else {
      response(res, 401, { message: 'Product not found!' });
    }
  } catch (error) {
    response(res, 400, error);
  }
};

products.fiter = async (req, res) => {
  try {
    const { name, category, price } = req.query;
    let filter = await model.getAllProduct();
    if (name === 'ASC' || name === 'DESC') {
      filter = await model.getAllProduct('public.product.title', name);
    }
    if (price === 'ASC' || price === 'DESC') {
      filter = await model.getAllProduct('public.product.price', price);
    }
    if (category) {
      filter = filter.filter((product) => product.category[0].name === category);
    }
    response(res, 200, filter);
  } catch (error) {
    response(res, 400, error);
  }
};

module.exports = products;
