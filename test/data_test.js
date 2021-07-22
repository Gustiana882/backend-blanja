const userLogin = {
  name: 'user',
  email: 'user@gmail.com',
  password: 'user123',
};

const user = {
  name: 'user test',
  email: 'usertest@gmail.com',
  password: 'user123',
};

const product = {
  id: 32, //
  title: 'baju',
  category: 2,
  price: 10000,
  brand: 'toko kami',
  review: 21,
  star: 4,
};

const category = {
  id: 32, //
  name: 'shose',
};

const bag = {
  id: 26, //
  productId: 1,
  qty: 3,
};

const image = {
  path: 'public/images/product/test (another copy).png',
};
module.exports = {
  product, category, bag, user, image, userLogin,
};
