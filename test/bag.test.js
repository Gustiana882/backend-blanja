/* eslint-disable no-undef */
const requests = require('supertest');
const app = require('../app');
const { bag, user } = require('./data_test');

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

describe('service bag', () => {
  describe('GET requests', () => {
    test('should return response status code 200', async () => {
      const respone = await requests(app)
        .get('/bag')
        .set('token', token);
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
        .post('/bag')
        .set('token', token)
        .send({
          productId: bag.productId,
          qty: bag.qty,
        });
      expect(respone.statusCode).toBe(200);
    });
  });

  describe('PUT requests', () => {
    test('should return response edit category success', async () => {
      const respone = await requests(app)
        .put('/bag')
        .set('token', token)
        .send({
          id: bag.id,
          productId: bag.productId,
          qty: bag.qty,
        });
      expect(respone.body.data[0].message).toEqual(expect.stringContaining('update data bag success'));
      expect(respone.statusCode).toBe(200);
    });
  });

  describe('DELETE requests', () => {
    test('should return response delete category success', async () => {
      const respone = await requests(app)
        .delete(`/bag/${bag.id}`)
        .set('token', token);
      expect(respone.body.data[0].message).toEqual(expect.stringContaining('delete data bag success'));
      expect(respone.statusCode).toBe(200);
    });
  });
});
