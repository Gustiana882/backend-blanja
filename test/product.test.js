/* eslint-disable no-undef */
const requests = require('supertest');
const app = require('../app');
const { product, user } = require('./data_test');

let token;

beforeAll((done) => {
  requests(app).post('/login').send({
    email: user.email,
    password: user.password,
  }).end((err, respon) => {
    token = respon.body.data[0].token_key;
    done();
  });
});

describe('service /product', () => {
  describe('GET requests', () => {
    test('should return response status code 200', async () => {
      const respone = await requests(app).get('/product');
      expect(respone.statusCode).toBe(200);
      expect(respone.body).toMatchObject({
        status: expect.any(Number),
        description: expect.any(String),
        isError: expect.any(Boolean),
        data: expect.any(Array),
      });
    });
  });
  describe('POST requests', () => {
    test('should return response post product', async () => {
      const respone = await requests(app)
        .post('/product')
        .set('token', token)
        .send({
          title: product.title,
          category: product.category,
          price: product.price,
          brand: product.brand,
          review: product.review,
          star: product.star,
        });
      expect(respone.statusCode).toBe(200);
    });
  });

  describe('PUT requests', () => {
    test('should return response edit product success', async () => {
      const respone = await requests(app)
        .put('/product')
        .set('token', token)
        .send({
          id: product.id,
          title: product.title,
          category: product.category,
          price: product.price,
          brand: product.brand,
          review: product.review,
          star: product.star,
        });
      expect(respone.body.data[0].message).toEqual(expect.stringContaining('data updated'));
      expect(respone.statusCode).toBe(200);
    });
  });

  describe('DELETE requests', () => {
    test('should return response delete product success', async () => {
      const respone = await requests(app)
        .delete(`/product/${product.id}`)
        .set('token', token);
      expect(respone.body.data[0].message).toEqual(expect.stringContaining('data success to delete'));
      expect(respone.statusCode).toBe(200);
    });
  });
});
