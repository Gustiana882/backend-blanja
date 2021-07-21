/* eslint-disable no-undef */
const requests = require('supertest');
const app = require('../app');
const { category, user } = require('./data_test');

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

describe('service category', () => {
  describe('GET requests', () => {
    test('should return response status code 200', async () => {
      const respone = await requests(app).get('/product/category');
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
    test('should return response post category', async () => {
      const respone = await requests(app)
        .post('/product/category')
        .set('token', token)
        .send({ name: category.name });
      expect(respone.statusCode).toBe(200);
    });
  });

  describe('PUT requests', () => {
    test('should return response edit category success', async () => {
      const respone = await requests(app)
        .put('/product/category')
        .set('token', token)
        .send({
          id: category.id,
          name: category.name,
        });
      expect(respone.body.data[0].message).toEqual(expect.stringContaining('edit category is success'));
      expect(respone.statusCode).toBe(200);
    });
  });

  describe('DELETE requests', () => {
    test('should return response delete category success', async () => {
      const respone = await requests(app)
        .delete(`/product/category/${category.id}`)
        .set('token', token);
      expect(respone.body.data[0].message).toEqual(expect.stringContaining('category success to delete'));
      expect(respone.statusCode).toBe(200);
    });
  });
});
