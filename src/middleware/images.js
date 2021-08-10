const multer = require('multer');
const response = require('../helpers/response');

// mengatur penyimpanan file name

const storages = (path) => multer.diskStorage({
  destination: `public/images/${path}`,
  filename: (req, file, cb) => {
    cb(null, `${new Date().toISOString()}-${file.originalname}`);
  },
});

const filter = (req, file, cb) => {
  if (
    file.mimetype === 'image/jpg'
    || file.mimetype === 'image/png'
    || file.mimetype === 'image/jpeg'
  ) {
    cb(null, true);
  } else {
    cb('image file must be in jpg, jpeg or png format', false);
  }
};

const images = (path) => (req, res, next) => {
  const upload = multer({
    storage: storages(path),
    fileFilter: filter,
  }).single('image');
  upload(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      response(res, 400, [], err.message, true);
    } else if (err) {
      response(res, 400, [], err.message, true);
    } else {
      next();
    }
  });
};

module.exports = images;
