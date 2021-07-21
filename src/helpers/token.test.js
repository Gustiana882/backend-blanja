/* eslint-disable no-undef */
require('dotenv/config');
const token = require('./token');

describe('helper/token', () => {
  test('should return random string', async () => {
    const result = await token('test@email.com', 'user');
    console.log(result);
    expect(result).toEqual(expect.stringContaining('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.'));
  });
});
