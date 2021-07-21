/* eslint-disable no-undef */
const deleteImages = require('./delete_images');
const { image } = require('../../test/data_test');

describe('helper/delete_images', () => {
  test('should return boolean false', async () => {
    const result = await deleteImages('public/images/product/2021-07-17T14:33:26.822Z-f2c747c5-1f63-4476-b1b9-d8aa8ace2ac2 2.png');
    expect(result).toBeFalsy();
  });
  test('should return boolean  true', async () => {
    const result = await deleteImages(image.path);
    expect(result).toBeTruthy();
  });
});
