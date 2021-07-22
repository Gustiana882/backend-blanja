/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const requests = require('supertest');
const app = require('../app');
const { user, userLogin } = require('./data_test');

describe('service register', () => {
  test('should return register success', async () => {
    const result = await requests(app).post('/register').send({
      name: user.name,
      email: user.email,
      password: user.password,
    });
    expect(result.body.data[0].message).toEqual(expect.stringContaining('register success'));
    expect(result.statusCode).toBe(200);
  });

  test('should return register gagal e-mail already registered', async () => {
    const result = await requests(app).post('/register').send({
      name: user.name,
      email: user.email,
      password: user.password,
    });
    expect(result.statusCode).toBe(400);
    expect(result.body.data[0].message).toEqual(expect.stringContaining('e-mail already registered'));
  });
});

describe('service login', () => {
  test('should return token jwt', async () => {
    const result = await requests(app).post('/login').send({
      email: userLogin.email,
      password: userLogin.password,
    });
    expect(result.statusCode).toBe(200);
    expect(result.body.data[0].message).toEqual(expect.stringContaining('login berhasil!'));
    expect(result.body.data[0].token_key).toEqual(expect.stringContaining('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9'));
  });
});
