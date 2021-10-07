/* eslint-disable no-undef */
require('dotenv/config');
const sendEmail = require('./sendEmail');

const to = 'gustiana882@gmail.com';

describe('helper/send email', () => {
  test('should send email', async () => {
    const result = sendEmail(to, 'gustiana', 'token 1234');
    expect(result).toMatchObject(object);
  });
});
