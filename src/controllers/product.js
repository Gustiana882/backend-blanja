/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
const products = {};
const model = require('../models/product');
const seller = require('../models/seller');
const categorymodel = require('../models/category');
const response = require('../helpers/response');
const { redisDb } = require('../configs/redis');
const deleteImages = require('../helpers/delete_images');
const nullValidator = require('../helpers/null_validator');
const decodeToken = require('../helpers/decode_token');
const stockData = require('../models/stockProduct');

products.getAllProduct = async (req, res) => {
  try {
    const allProduct = await model.getAllProduct();
    redisDb.setex('product', 60, JSON.stringify(allProduct));
    const result = allProduct.map((value) => {
      const data = {
        id: value.id,
        name: value.name,
        price: value.price,
        brand: value.brand,
        categories: value.categories.name,
        score: value.scores,
        stock: value.stocks.stock || 0,
        image: value.image,
        description: value.description,
        condition: value.condition,
        createdAt: value.createdAt,
        updatedAt: value.updatedAt,
      };
      return data;
    });
    response(res, 200, result);
  } catch (error) {
    response(res, 400, [], error.message, true);
  }
};

products.getAllMyProduct = async (req, res) => {
  try {
    const decode = await decodeToken(req.headers.token);
    const allProduct = await model.getAllMyProduct(decode.user);
    const result = allProduct.map((value) => {
      const data = {
        id: value.id,
        name: value.name,
        price: value.price,
        brand: value.brand,
        categories: value.categories.name,
        score: value.scores,
        stock: value.stocks.stock || 0,
        image: value.image,
        description: value.description,
        idUser: value.id_user,
        condition: value.condition,
        createdAt: value.createdAt,
        updatedAt: value.updatedAt,
      };
      return data;
    });
    response(res, 200, result);
  } catch (error) {
    response(res, 400, [], error.message, true);
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

    if (!result) {
      response(res, 200, [], 'product not found');
    } else {
      response(res, 200, [result]);
    }
  } catch (error) {
    response(res, 400, [], error.message, true);
  }
};

// eslint-disable-next-line consistent-return
products.addProduct = async (req, res) => {
  const pathImage = (req.file) ? req.file.path : 'public/images/blank.jpg';
  try {
    const decode = await decodeToken(req.headers.token);
    const cekEmail = await seller.getSellerByEmail(decode.user);
    if (cekEmail.length < 1 && decode.roles !== 'seller') {
      return response(res, 200, [], 'Access denied!', true);
    }

    if (!nullValidator(req.body)) {
      return response(res, 200, [], 'check the input data is not empty', true);
    }

    const category = await categorymodel.getCategoryById(req.body.category);
    if (!category) {
      deleteImages(pathImage);
      return response(res, 200, [], 'category not found', true);
    }

    const data = {
      name: req.body.name,
      category_id: req.body.category,
      price: req.body.price,
      brand: req.body.brand,
      review: req.body.review,
      star: req.body.star,
      condition: req.body.condition,
      description: req.body.description,
      image: pathImage,
      id_user: decode.user,
      stock: req.body.stock || 0,
    };
    const resultId = await model.addProduct(data);
    const result = await stockData.addStock({ id_product: resultId.id, stock: data.stock });
    redisDb.del('product');
    if (result) {
      response(res, 200, [], 'add product is success');
    } else {
      response(res, 200, [], 'add product is error', true);
    }
  } catch (error) {
    deleteImages(pathImage);
    response(res, 500, [], error.message, true);
  }
};

products.editStock = async (req, res) => {
  try {
    const cekid = await stockData.getStockById(req.body.id);
    if (!cekid) {
      return response(res, 200, [], 'stock not found', true);
    }

    const data = {
      id: req.body.id,
      id_product: req.body.id_product,
      stock: req.body.stock,
    };

    const result = await stockData.editStock(data);
    if (result > 0) {
      return response(res, 200, [], 'data updated');
    }
    response(res, 200, [], 'data gagal updated', true);
  } catch (error) {
    response(res, 500, [], error.message, true);
  }
};

products.updateProduct = async (req, res) => {
  const pathImage = (req.file) ? req.file.path : 'public/images/blank.jpg';
  try {
    const decode = await decodeToken(req.headers.token);
    const cekEmail = await seller.getSellerByEmail(decode.user);
    if (cekEmail.length < 1 && decode.roles !== 'seller') {
      return response(res, 200, [], 'Access denied!', true);
    }

    if (!nullValidator(req.body)) {
      return response(res, 200, [], 'check the input data is not empty', true);
    }

    const cekid = await model.getProductById(req.body.id);
    if (!cekid) {
      deleteImages(pathImage);
      return response(res, 200, [], 'id not found!', true);
    }

    const data = {
      id_product: req.body.id,
      name: req.body.name,
      category_id: req.body.category,
      price: req.body.price,
      brand: req.body.brand,
      review: req.body.review,
      star: req.body.star,
      condition: req.body.condition,
      image: (req.file) ? req.file.path : cekid.image,
      description: req.body.description || 'no description',
    };
    const respons = await model.updateProduct(data);

    if (req.file) {
      deleteImages(cekid.image);
    }

    redisDb.del('product');
    if (respons > 0) {
      response(res, 200, [], 'data updated');
    } else {
      response(res, 200, [], 'data gagal updated', true);
    }
  } catch (error) {
    deleteImages(pathImage);
    response(res, 500, [], error.message, true, true);
  }
};

products.deleteProduct = async (req, res) => {
  try {
    const decode = await decodeToken(req.headers.token);
    const cekEmail = await seller.getSellerByEmail(decode.user);
    if (cekEmail.length < 1 && decode.roles !== 'seller') {
      return response(res, 200, [], 'Access denied!', true);
    }

    const cekid = await model.getProductById(req.params.id);
    if (!cekid) {
      return response(res, 200, [], 'id not found!', true);
    }

    const respons = await model.deleteProduct(req.params.id);
    deleteImages(cekid.image);
    redisDb.del('product');
    if (respons > 0) {
      response(res, 200, [], 'data success to delete');
    } else {
      response(res, 200, [], 'data failed to delete', true);
    }
  } catch (error) {
    response(res, 500, [], error.message, true, true);
  }
};

products.searchProduct = async (req, res) => {
  try {
    const searchProduct = await model.searchProduct(req.query.p);
    if (searchProduct.length > 0) {
      response(res, 200, searchProduct);
    } else {
      response(res, 200, [], 'Product not found!');
    }
  } catch (error) {
    response(res, 500, [], error.message, true);
  }
};

products.fiter = async (req, res) => {
  try {
    const { name, category, price } = req.query;
    let filter = await model.getAllProduct();
    if (name === 'ASC' || name === 'DESC') {
      filter = await model.getAllProduct('name', name);
    }
    if (price === 'ASC' || price === 'DESC') {
      filter = await model.getAllProduct('price', price);
    }
    if (category && category !== 'All') {
      filter = filter.filter((product) => product.categories.name === category);
    }
    response(res, 200, filter);
  } catch (error) {
    response(res, 500, [], error.message, true);
  }
};

module.exports = products;
