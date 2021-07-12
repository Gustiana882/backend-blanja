/* eslint-disable no-useless-catch */
const { uploader } = require('../configs/cloudinary');

async function cloadinary(pathFIle) {
  try {
    const result = await uploader.upload(pathFIle, {
      folder: 'profile',
      use_filename: true,
    });
    return result.url;
  } catch (error) {
    throw error;
  }
}

module.exports = cloadinary;
