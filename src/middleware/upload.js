const multer = require('multer');
const response = require('../helpers/response');
// mengatur penyimpanan file name

const storages = multer.diskStorage({
  destination: 'public/images/profile',
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

const uploadImage = (req, res, next) => {
  const upload = multer({
    storage: storages,
    fileFilter: filter,
  }).single('image');
  upload(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      response(res, 400, { message: err }, true);
    } else if (err) {
      response(res, 400, { message: err }, true);
    } else {
      next();
    }
  });
};

module.exports = uploadImage;
