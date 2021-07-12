const { unlink } = require('fs');

const deleteImages = (path) => {
  unlink(path, (error) => {
    if (error) console.log(error);
    return true;
  });
};

module.exports = deleteImages;
