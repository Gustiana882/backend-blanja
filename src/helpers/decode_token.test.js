/* eslint-disable no-undef */
require('dotenv/config');
const decodeToken = require('./decode_token');

const object = {
  user: expect.any(String),
  role: expect.any(String),
};

describe('helper/decode_token', () => {
  test('should return object data', async () => {
    const result = await decodeToken('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoidGVzdEBnbWFpbC5jb20iLCJyb2xlcyI6ImFkbWluIiwiaWF0IjoxNjI2NzUyMzMwLCJleHAiOjE2MjY4Mzg3MzB9.m3stPCyzhqCRxGmKusp8OQyHJStFnEPFnrb69qbzf38');
    expect(result).toMatchObject(object);
  });
});
