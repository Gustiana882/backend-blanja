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
    // console.log(allProduct);
    response(res, 200, allProduct);
  } catch (error) {
    response(res, 400, { message: error.message }, true);
  }
};

products.getProductByName = async (req, res) => {
  try {
    let result;
    if (req.params.id.match('[0-9]')) {
      result = await model.getProductById(req.params.id);
    } else {
      result = await model.getProductByName(req.params.id);
    }
    redisDb.setex('product', 60, JSON.stringify(result));
    // console.log(result);
    if (!result) {
      response(res, 200, { message: 'product not found' });
    } else {
      response(res, 200, [result]);
    }
  } catch (error) {
    response(res, 400, { message: error.message }, true);
  }
};

products.addProduct = async (req, res) => {
  const pathImage = (req.file) ? req.file.path : 'public/images/blank.jpg';
  try {
    const category = await categorymodel.getCategoryById(req.body.category);
    if (!category) {
      deleteImages(pathImage);
      response(res, 401, { message: 'category not found' });
    } else {
      const data = {
        title: req.body.title,
        category_id: req.body.category,
        price: req.body.price,
        brand: req.body.brand,
        review: req.body.review,
        star: req.body.star,
        image: pathImage,
      };
      const respons = await model.addProduct(data);
      redisDb.del('product');
      if (respons) {
        response(res, 200, { message: 'add product is success' });
      } else {
        response(res, 400, { message: 'add product is error' }, true);
      }
    }
  } catch (error) {
    deleteImages(pathImage);
    response(res, 400, error);
  }
};

products.updateProduct = async (req, res) => {
  const pathImage = (req.file) ? req.file.path : 'public/images/blank.jpg';
  try {
    const cekid = await model.getProductById(req.body.id);
    if (!cekid) {
      deleteImages(pathImage);
      response(res, 401, { message: 'id not found!' }, true);
    } else {
      const data = {
        id_product: req.body.id,
        title: req.body.title,
        category_id: req.body.category,
        price: req.body.price,
        brand: req.body.brand,
        review: req.body.review,
        star: req.body.star,
        image: pathImage,
      };
      const respons = await model.updateProduct(data);
      deleteImages(cekid.image);
      redisDb.del('product');
      if (respons > 0) {
        response(res, 200, { message: 'data updated' });
      } else {
        response(res, 400, { message: 'data gagal updated' }, true);
      }
    }
  } catch (error) {
    deleteImages(pathImage);
    response(res, 400, error, true);
  }
};

products.deleteProduct = async (req, res) => {
  try {
    const cekid = await model.getProductById(req.params.id);
    if (!cekid) {
      response(res, 401, { message: 'id not found!' }, true);
    } else {
      const respons = await model.deleteProduct(req.params.id);
      deleteImages(cekid.image);
      redisDb.del('product');
      if (respons > 0) {
        response(res, 200, { message: 'data success to delete' });
      } else {
        response(res, 400, { message: 'data failed to delete' }, true);
      }
    }
  } catch (error) {
    response(res, 400, error, true);
  }
};

products.searchProduct = async (req, res) => {
  try {
    const searchProduct = await model.searchProduct(req.query.p);
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
      filter = await model.getAllProduct('title', name);
    }
    if (price === 'ASC' || price === 'DESC') {
      filter = await model.getAllProduct('price', price);
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
