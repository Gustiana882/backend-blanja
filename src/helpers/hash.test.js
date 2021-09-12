/* eslint-disable no-undef */
const hash = require('./hash');

describe('helpers/hash', () => {
  test('should return random char', async () => {
    const result = await hash('abcd123');
    expect(result).toEqual(expect.stringContaining('$2b$10$'));
  });
});
