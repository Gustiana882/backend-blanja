/* eslint-disable prefer-promise-reject-errors */
/* eslint-disable no-unused-expressions */
const { unlink } = require('fs');

const deleteImages = (path) => new Promise((resolve) => {
  if (path !== 'public/images/blank.jpg') {
    unlink(path, (error) => {
      (error) ? resolve(false) : resolve(true);
    });
  }
});

module.exports = deleteImages;
