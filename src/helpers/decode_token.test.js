/* eslint-disable no-undef */
require('dotenv/config');
const decodeToken = require('./decode_token');

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiZW1haWxUZXN0QGdtYWlsLmNvbSIsInJvbGVzIjoiYWRtaW4iLCJpYXQiOjE2Mjc2MzExNzZ9.X7kQuK-sR18U2fZv_rBGUM-W1pHEd3nc4SdXTYLPPCw';
const object = {
  role: expect.any(String),
  user: expect.any(String),
};

describe('helper/decode_token', () => {
  test('should return object data', async () => {
    const result = await decodeToken(token);
    expect(result).toMatchObject(object);
  });
});
