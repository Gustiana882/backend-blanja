/* eslint-disable no-useless-catch */
const { uploader } = require('../configs/cloudinary');

async function uploads(folders, pathFIle) {
  try {
    if (pathFIle === 'public/images/blank.jpg') {
      return 'https://res.cloudinary.com/dhu2tfdji/image/upload/v1632887984/samples/image-not-found_lubthc.jpg';
    }
    // console.log(global.coba);
    const result = await uploader.upload(pathFIle, {
      folder: `Blanja/${folders}`,
      use_filename: true,
    });
    return result.url;
  } catch (error) {
    throw error;
  }
}

module.exports = uploads;
