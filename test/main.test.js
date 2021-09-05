/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/**
 * @index
 *
 *  - service register customer
 *  - service register seller
 *  - service login customer
 *  - service login seller
 *  - GET customer profile
 *  - GET seller profile
 *  - PUT requests edit custemer profile
 *  - PUT requests edit seller profile
 *  - PUT requests edit password customer
 *  - PUT requests edit password seller
 *  - POST Category
 *  - POST Product add product from seller
 *  - PUT Product
 *  - DELETE Product
 *  - GET Product
 */

require('dotenv/config');
const requests = require('supertest');
const app = require('../app');
const { sequelize } = require('../src/configs/db');

let tokenSeller;
let tokenCustomer;
const formRegisterCustomer = {
  name: 'test',
  email: 'emailTest@gmail.com',
  password: 'test1234',
};

const standarResponse = {
  statusCode: expect.any(Number),
  description: expect.any(String),
  isError: expect.any(Boolean),
  message: expect.any(String),
  data: expect.any(Array),
};

const createDataBase = async () => {
  await sequelize.sync({ force: true });
};

beforeAll(async () => {
  await createDataBase();
});

describe('service register customer', () => {
  test('should return register success', async () => {
    const result = await requests(app).post('/api/register/customer').send({
      name: formRegisterCustomer.name,
      email: formRegisterCustomer.email,
      password: formRegisterCustomer.password,
    });
    expect(result.body.message).toEqual(expect.stringContaining('register success'));
    expect(result.statusCode).toBe(200);
  });

  test('should return register gagal e-mail already registered', async () => {
    const result = await requests(app).post('/api/register/customer').send({
      name: formRegisterCustomer.name,
      email: formRegisterCustomer.email,
      password: formRegisterCustomer.password,
    });
    expect(result.statusCode).toBe(200);
    expect(result.body.message).toEqual(expect.stringContaining('e-mail already registered'));
  });
});

const formRegisterSeller = {
  name: 'test',
  email: 'emailTest@gmail.com',
  phone: '087870560438',
  store: 'toko kita',
  password: 'test1234',
};

describe('service register seller', () => {
  test('should return register success', async () => {
    const result = await requests(app).post('/api/register/seller').send({
      name: formRegisterSeller.name,
      email: formRegisterSeller.email,
      phone: formRegisterSeller.phone,
      store: formRegisterSeller.store,
      password: formRegisterSeller.password,
    });
    expect(result.body.message).toEqual(expect.stringContaining('register success'));
    expect(result.statusCode).toBe(200);
  });

  test('should return register gagal e-mail already registered', async () => {
    const result = await requests(app).post('/api/register/seller').send({
      name: formRegisterSeller.name,
      email: formRegisterSeller.email,
      phone: formRegisterSeller.phone,
      store: formRegisterSeller.store,
      password: formRegisterSeller.password,
    });
    expect(result.statusCode).toBe(200);
    expect(result.body.message).toEqual(expect.stringContaining('e-mail already registered'));
  });
});

const formLoginCustomer = {
  email: 'emailTest@gmail.com',
  password: 'test1234',
};

describe('service login customer', () => {
  test('should return token jwt', async () => {
    const result = await requests(app).post('/api/login/customer').send({
      email: formLoginCustomer.email,
      password: formLoginCustomer.password,
    });
    tokenCustomer = result.body.data[0].token_key;
    expect(result.statusCode).toBe(200);
    expect(result.body).toEqual(expect.objectContaining(standarResponse));
    expect(result.body.message).toEqual(expect.stringContaining('login berhasil!'));
    expect(result.body.data[0].token_key).toEqual(expect.stringContaining('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9'));
  });
});

const formLoginSeller = {
  email: 'emailTest@gmail.com',
  password: 'test1234',
};

describe('service login seller', () => {
  test('should return token jwt', async () => {
    const result = await requests(app).post('/api/login/seller').send({
      email: formLoginSeller.email,
      password: formLoginSeller.password,
    });
    tokenSeller = result.body.data[0].token_key;
    expect(result.statusCode).toBe(200);
    expect(result.body).toEqual(expect.objectContaining(standarResponse));
    expect(result.body.message).toEqual(expect.stringContaining('login berhasil!'));
    expect(result.body.data[0].token_key).toEqual(expect.stringContaining('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9'));
  });
});

const standarCustomerProfile = {
  id: expect.any(Number),
  name: expect.any(String),
  email: expect.any(String),
  phone: null,
  image: expect.any(String),
  password: expect.any(String),
  gender: null,
  dateBirth: null,
  roles: expect.any(String),
  updatedAt: expect.any(String),
  createdAt: expect.any(String),
};

describe('GET customer profile', () => {
  test('should return response status code 200', async () => {
    const respone = await requests(app)
      .get('/api/profile/customer')
      .set('token', tokenCustomer);
    expect(respone.statusCode).toBe(200);
  });
  test('should return response standar', async () => {
    const respone = await requests(app)
      .get('/api/profile/customer')
      .set('token', tokenCustomer);
    expect(respone.body).toMatchObject(standarResponse);
  });
  test('should return response standar data', async () => {
    const respone = await requests(app)
      .get('/api/profile/customer')
      .set('token', tokenCustomer);
    expect(respone.body.data[0]).toMatchObject(standarCustomerProfile);
  });
});

const standarSellerProfile = {
  id: expect.any(Number),
  name: expect.any(String),
  email: expect.any(String),
  store: expect.any(String),
  phone: expect.any(String),
  image: expect.any(String),
  password: expect.any(String),
  description: null,
  roles: expect.any(String),
  updatedAt: expect.any(String),
  createdAt: expect.any(String),
};

describe('GET seller profile', () => {
  test('should return response status code 200', async () => {
    const respone = await requests(app)
      .get('/api/profile/seller')
      .set('token', tokenSeller);
    expect(respone.statusCode).toBe(200);
  });
  test('should return response standar', async () => {
    const respone = await requests(app)
      .get('/api/profile/seller')
      .set('token', tokenSeller);
    expect(respone.body).toMatchObject(standarResponse);
  });
  test('should return response standar data', async () => {
    const respone = await requests(app)
      .get('/api/profile/seller')
      .set('token', tokenSeller);
    expect(respone.body.data[0]).toMatchObject(standarSellerProfile);
  });
});

const standarResponseEditCustomer = {
  name: 'test edit',
  phone: 'phone edit',
  image: 'public/images/blank.jpg',
  gender: 'gender edit',
  dateBirth: 'birth edit',
  updatedAt: expect.any(String),
  createdAt: expect.any(String),
};

describe('PUT requests edit custemer profile', () => {
  test('should return response status Code', async () => {
    const respone = await requests(app)
      .put('/api/profile/customer/edit-profile')
      .set('token', tokenCustomer)
      .send({
        name: 'testedit',
      });
    expect(respone.statusCode).toBe(200);
  });
  test('should return response edit profile success', async () => {
    const respone = await requests(app)
      .put('/api/profile/customer/edit-profile')
      .set('token', tokenCustomer)
      .send({
        name: 'test edit',
        phone: 'phone edit',
        image: 'public/images/blank.jpg',
        gender: 'gender edit',
        dateBirth: 'birth edit',
        updatedAt: expect.any(String),
        createdAt: expect.any(String),
      });
    expect(respone.body.message).toEqual(expect.stringContaining('edit profil success'));
  });
  test('should return response status Code', async () => {
    const respone = await requests(app)
      .get('/api/profile/customer')
      .set('token', tokenCustomer);
    expect(respone.body.data[0]).toMatchObject(standarResponseEditCustomer);
  });
});

const standarResponseEditSeller = {
  name: 'test edit',
  store: 'store edit',
  phone: 'phone edit',
  image: 'public/images/blank.jpg',
  description: 'description edit',
  updatedAt: expect.any(String),
  createdAt: expect.any(String),
};

describe('PUT requests edit seller profile', () => {
  test('should return response status Code', async () => {
    const respone = await requests(app)
      .put('/api/profile/seller/edit-profile')
      .set('token', tokenSeller)
      .send({
        name: 'testedit',
      });
    expect(respone.statusCode).toBe(200);
  });
  test('should return response edit profile success', async () => {
    const respone = await requests(app)
      .put('/api/profile/seller/edit-profile')
      .set('token', tokenSeller)
      .send({
        name: 'test edit',
        store: 'store edit',
        phone: 'phone edit',
        image: 'public/images/blank.jpg',
        description: 'description edit',
        updatedAt: expect.any(String),
        createdAt: expect.any(String),
      });
    expect(respone.body.message).toEqual(expect.stringContaining('edit profil success'));
  });
  test('should return response status Code', async () => {
    const respone = await requests(app)
      .get('/api/profile/seller')
      .set('token', tokenSeller);
    expect(respone.body.data[0]).toMatchObject(standarResponseEditSeller);
  });
});

describe('PUT requests edit password customer', () => {
  test('should return response status Code', async () => {
    const respone = await requests(app)
      .put('/api/profile/customer/edit-password')
      .set('token', tokenCustomer)
      .send({
        oldPassword: 'test1234',
        newPassword: 'test1234',
      });
    expect(respone.statusCode).toBe(200);
  });
  test('should return response edit profile success', async () => {
    const respone = await requests(app)
      .put('/api/profile/customer/edit-password')
      .set('token', tokenCustomer)
      .send({
        oldPassword: 'test1234',
        newPassword: 'test12345',
      });
    expect(respone.body.message).toEqual(expect.stringContaining('edit password success'));
  });
  describe('service login customer', () => {
    test('should return token jwt', async () => {
      const result = await requests(app).post('/api/login/customer').send({
        email: formLoginCustomer.email,
        password: 'test12345',
      });
      tokenCustomer = result.body.data[0].token_key;
      expect(result.statusCode).toBe(200);
      expect(result.body).toEqual(expect.objectContaining(standarResponse));
      expect(result.body.message).toEqual(expect.stringContaining('login berhasil!'));
      expect(result.body.data[0].token_key).toEqual(expect.stringContaining('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9'));
    });
  });
});

describe('POST Category', () => {
  test('should return response post category', async () => {
    const respone = await requests(app)
      .post('/api/product/category')
      .set('token', tokenSeller)
      .send({ name: 'T-shirt' });
    expect(respone.statusCode).toBe(200);
  });
  test('should return response post category', async () => {
    const respone = await requests(app)
      .post('/api/product/category')
      .set('token', tokenSeller)
      .send({ name: 'Shorts' });
    expect(respone.statusCode).toBe(200);
  });
  test('should return response post category', async () => {
    const respone = await requests(app)
      .post('/api/product/category')
      .set('token', tokenSeller)
      .send({ name: 'Jacket' });
    expect(respone.statusCode).toBe(200);
  });
  test('should return response post category', async () => {
    const respone = await requests(app)
      .post('/api/product/category')
      .set('token', tokenSeller)
      .send({ name: 'Pants' });
    expect(respone.statusCode).toBe(200);
  });
  test('should return response post category', async () => {
    const respone = await requests(app)
      .post('/api/product/category')
      .set('token', tokenSeller)
      .send({ name: 'Shoes' });
    expect(respone.statusCode).toBe(200);
  });
});

describe('PUT requests edit password seller', () => {
  test('should return response status Code', async () => {
    const respone = await requests(app)
      .put('/api/profile/seller/edit-password')
      .set('token', tokenSeller)
      .send({
        oldPassword: 'test1234',
        newPassword: 'test1234',
      });
    expect(respone.statusCode).toBe(200);
  });
  test('should return response edit password success', async () => {
    const respone = await requests(app)
      .put('/api/profile/seller/edit-password')
      .set('token', tokenSeller)
      .send({
        oldPassword: 'test1234',
        newPassword: 'test12345',
      });
    expect(respone.body.message).toEqual(expect.stringContaining('edit password success'));
  });
  describe('service login seller', () => {
    test('should return token jwt', async () => {
      const result = await requests(app).post('/api/login/seller').send({
        email: formLoginCustomer.email,
        password: 'test12345',
      });
      tokenSeller = result.body.data[0].token_key;
      expect(result.statusCode).toBe(200);
      expect(result.body).toEqual(expect.objectContaining(standarResponse));
      expect(result.body.message).toEqual(expect.stringContaining('login berhasil!'));
      expect(result.body.data[0].token_key).toEqual(expect.stringContaining('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9'));
    });
  });
});

describe('POST Product add product from seller', () => {
  test('should return response status code 200', async () => {
    const respone = await requests(app)
      .post('/api/product')
      .set('token', tokenSeller)
      .send({
        name: 'baju',
        category: 1,
        price: 10000,
        brand: 'toko kami',
        condition: 'New',
        stock: 10,
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Expedita, voluptatum? Lorem ipsum, dolor sit amet consectetur adipisicing elit.Nulla alias assumenda quam iste repellendus, dicta consequatur aperiam quod quos officiis mollitia numquam praesentium repellat provident quas perferendis hic ullam.Voluptate expedita tempora voluptatum velit.Sit voluptas magni unde, laborum totam nisi ab, laudantium suscipit nobis, voluptatibus tenetur odit eligendi pariatur? Lorem ipsum dolor sit amet consectetur adipisicing elit.Quia consequatur possimus, enim deleniti asperiores, fugit odit praesentium ipsam accusantium perspiciatis quod voluptatum aut libero.Esse unde eos eligendi possimus corporis quidem, aut sed accusantium alias! Molestias suscipit nostrum tenetur, autem sint totam dolor odit officiis ducimus mollitia deserunt quidem quisquam. Lorem ipsum, dolor sit amet consectetur adipisicing elit.Reprehenderit, quaerat!',
      });
    expect(respone.statusCode).toBe(200);
    expect(respone.body.message).toBe('add product is success');
  });
  test('should return response status code 200', async () => {
    const respone = await requests(app)
      .post('/api/product')
      .set('token', tokenSeller)
      .send({
        name: 'baju koko',
        category: 1,
        price: 190000,
        brand: 'toko kami',
        condition: 'New',
        stock: 10,
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Expedita, voluptatum? Lorem ipsum, dolor sit amet consectetur adipisicing elit.Nulla alias assumenda quam iste repellendus, dicta consequatur aperiam quod quos officiis mollitia numquam praesentium repellat provident quas perferendis hic ullam.Voluptate expedita tempora voluptatum velit.Sit voluptas magni unde, laborum totam nisi ab, laudantium suscipit nobis, voluptatibus tenetur odit eligendi pariatur? Lorem ipsum dolor sit amet consectetur adipisicing elit.Quia consequatur possimus, enim deleniti asperiores, fugit odit praesentium ipsam accusantium perspiciatis quod voluptatum aut libero.Esse unde eos eligendi possimus corporis quidem, aut sed accusantium alias! Molestias suscipit nostrum tenetur, autem sint totam dolor odit officiis ducimus mollitia deserunt quidem quisquam. Lorem ipsum, dolor sit amet consectetur adipisicing elit.Reprehenderit, quaerat!',
      });
    expect(respone.statusCode).toBe(200);
    expect(respone.body.message).toBe('add product is success');
  });
  test('should return response status code 200', async () => {
    const respone = await requests(app)
      .post('/api/product')
      .set('token', tokenSeller)
      .send({
        name: 'Adidas',
        category: 5,
        price: 150000,
        brand: 'toko Adidas',
        condition: 'New',
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Expedita, voluptatum? Lorem ipsum, dolor sit amet consectetur adipisicing elit.Nulla alias assumenda quam iste repellendus, dicta consequatur aperiam quod quos officiis mollitia numquam praesentium repellat provident quas perferendis hic ullam.Voluptate expedita tempora voluptatum velit.Sit voluptas magni unde, laborum totam nisi ab, laudantium suscipit nobis, voluptatibus tenetur odit eligendi pariatur? Lorem ipsum dolor sit amet consectetur adipisicing elit.Quia consequatur possimus, enim deleniti asperiores, fugit odit praesentium ipsam accusantium perspiciatis quod voluptatum aut libero.Esse unde eos eligendi possimus corporis quidem, aut sed accusantium alias! Molestias suscipit nostrum tenetur, autem sint totam dolor odit officiis ducimus mollitia deserunt quidem quisquam. Lorem ipsum, dolor sit amet consectetur adipisicing elit.Reprehenderit, quaerat!',
      });
    expect(respone.statusCode).toBe(200);
    expect(respone.body.message).toBe('add product is success');
  });
  test('should return access is not allowed if token not seller', async () => {
    const respone = await requests(app)
      .post('/api/product')
      .set('token', tokenCustomer)
      .send({
        name: 'Adidas',
        category: 5,
        price: 150000,
        brand: 'toko Adidas',
        condition: 'New',
        stock: 10,
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Expedita, voluptatum? Lorem ipsum, dolor sit amet consectetur adipisicing elit.Nulla alias assumenda quam iste repellendus, dicta consequatur aperiam quod quos officiis mollitia numquam praesentium repellat provident quas perferendis hic ullam.Voluptate expedita tempora voluptatum velit.Sit voluptas magni unde, laborum totam nisi ab, laudantium suscipit nobis, voluptatibus tenetur odit eligendi pariatur? Lorem ipsum dolor sit amet consectetur adipisicing elit.Quia consequatur possimus, enim deleniti asperiores, fugit odit praesentium ipsam accusantium perspiciatis quod voluptatum aut libero.Esse unde eos eligendi possimus corporis quidem, aut sed accusantium alias! Molestias suscipit nostrum tenetur, autem sint totam dolor odit officiis ducimus mollitia deserunt quidem quisquam. Lorem ipsum, dolor sit amet consectetur adipisicing elit.Reprehenderit, quaerat!',
      });
    expect(respone.statusCode).toBe(401);
    expect(respone.body.message).toBe('access is not allowed');
  });
});

describe('PUT Product', () => {
  test('should return response edit product success', async () => {
    const respone = await requests(app)
      .put('/api/product')
      .set('token', tokenSeller)
      .send({
        id: 1,
        name: 'baju wanita',
        category: 1,
        price: 190000,
        brand: 'toko kami',
        condition: 'New',
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Expedita, voluptatum? Lorem ipsum, dolor sit amet consectetur adipisicing elit.Nulla alias assumenda quam iste repellendus, dicta consequatur aperiam quod quos officiis mollitia numquam praesentium repellat provident quas perferendis hic ullam.Voluptate expedita tempora voluptatum velit.Sit voluptas magni unde, laborum totam nisi ab, laudantium suscipit nobis, voluptatibus tenetur odit eligendi pariatur? Lorem ipsum dolor sit amet consectetur adipisicing elit.Quia consequatur possimus, enim deleniti asperiores, fugit odit praesentium ipsam accusantium perspiciatis quod voluptatum aut libero.Esse unde eos eligendi possimus corporis quidem, aut sed accusantium alias! Molestias suscipit nostrum tenetur, autem sint totam dolor odit officiis ducimus mollitia deserunt quidem quisquam. Lorem ipsum, dolor sit amet consectetur adipisicing elit.Reprehenderit, quaerat!',
      });
    expect(respone.body.message).toEqual(expect.stringContaining('data updated'));
    expect(respone.statusCode).toBe(200);
  });
  test('should return response id not found', async () => {
    const respone = await requests(app)
      .put('/api/product')
      .set('token', tokenSeller)
      .send({
        id: 0,
        name: 'baju wanita',
        category: 1,
        price: 190000,
        brand: 'toko kami',
        condition: 'New',
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Expedita, voluptatum? Lorem ipsum, dolor sit amet consectetur adipisicing elit.Nulla alias assumenda quam iste repellendus, dicta consequatur aperiam quod quos officiis mollitia numquam praesentium repellat provident quas perferendis hic ullam.Voluptate expedita tempora voluptatum velit.Sit voluptas magni unde, laborum totam nisi ab, laudantium suscipit nobis, voluptatibus tenetur odit eligendi pariatur? Lorem ipsum dolor sit amet consectetur adipisicing elit.Quia consequatur possimus, enim deleniti asperiores, fugit odit praesentium ipsam accusantium perspiciatis quod voluptatum aut libero.Esse unde eos eligendi possimus corporis quidem, aut sed accusantium alias! Molestias suscipit nostrum tenetur, autem sint totam dolor odit officiis ducimus mollitia deserunt quidem quisquam. Lorem ipsum, dolor sit amet consectetur adipisicing elit.Reprehenderit, quaerat!',
      });
    expect(respone.body.message).toEqual(expect.stringContaining('id not found'));
    expect(respone.statusCode).toBe(200);
  });
  test('should return response check the input data is not empty', async () => {
    const respone = await requests(app)
      .put('/api/product')
      .set('token', tokenSeller)
      .send({
        id: 1,
        name: '',
        category: 1,
        price: 0,
        brand: '',
        condition: '',
        description: '',
      });
    expect(respone.body.message).toEqual(expect.stringContaining('check the input data is not empty'));
    expect(respone.statusCode).toBe(200);
  });
  test('should return response access is not allowed if token not seller', async () => {
    const respone = await requests(app)
      .put('/api/product')
      .set('token', tokenCustomer)
      .send({
        id: 0,
        name: 'baju wanita',
        category: 1,
        price: 190000,
        brand: 'toko kami',
        condition: 'New',
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Expedita, voluptatum? Lorem ipsum, dolor sit amet consectetur adipisicing elit.Nulla alias assumenda quam iste repellendus, dicta consequatur aperiam quod quos officiis mollitia numquam praesentium repellat provident quas perferendis hic ullam.Voluptate expedita tempora voluptatum velit.Sit voluptas magni unde, laborum totam nisi ab, laudantium suscipit nobis, voluptatibus tenetur odit eligendi pariatur? Lorem ipsum dolor sit amet consectetur adipisicing elit.Quia consequatur possimus, enim deleniti asperiores, fugit odit praesentium ipsam accusantium perspiciatis quod voluptatum aut libero.Esse unde eos eligendi possimus corporis quidem, aut sed accusantium alias! Molestias suscipit nostrum tenetur, autem sint totam dolor odit officiis ducimus mollitia deserunt quidem quisquam. Lorem ipsum, dolor sit amet consectetur adipisicing elit.Reprehenderit, quaerat!',
      });
    expect(respone.body.message).toEqual(expect.stringContaining('access is not allowed'));
    expect(respone.statusCode).toBe(401);
  });
});

describe('DELETE Product', () => {
  test('should return response delete product success', async () => {
    const respone = await requests(app)
      .delete('/api/product/1')
      .set('token', tokenSeller);
    expect(respone.body.message).toEqual(expect.stringContaining('data success to delete'));
    expect(respone.statusCode).toBe(200);
  });
  test('should return response id not found! if token not seller', async () => {
    const respone = await requests(app)
      .delete('/api/product/0')
      .set('token', tokenSeller);
    expect(respone.body.message).toEqual(expect.stringContaining('id not found!'));
    expect(respone.statusCode).toBe(200);
  });
  test('should return response access is not allowed if token not seller', async () => {
    const respone = await requests(app)
      .delete('/api/product/2')
      .set('token', tokenCustomer);
    expect(respone.body.message).toEqual(expect.stringContaining('access is not allowed'));
    expect(respone.statusCode).toBe(401);
  });
});

const standarProduct = {
  id: expect.any(Number),
  name: expect.any(String),
  price: expect.any(Number),
  brand: expect.any(String),
  categories: expect.any(String),
  score: expect.any(Array),
  stock: expect.any(Number),
  image: expect.any(String),
  description: expect.any(String),
  condition: expect.any(String),
  createdAt: expect.any(String),
  updatedAt: expect.any(String),
};

describe('GET Product', () => {
  test('should return response status code 200', async () => {
    const respone = await requests(app).get('/api/product');
    expect(respone.statusCode).toBe(200);
  });
  test('should return response object', async () => {
    const respone = await requests(app).get('/api/product');
    expect(respone.body).toMatchObject(standarResponse);
  });
  test('should return response standar response data product', async () => {
    const respone = await requests(app).get('/api/product');
    expect(respone.body.data[0]).toEqual(expect.objectContaining(standarProduct));
  });
});

describe('GET My Product', () => {
  test('should return response status code 200', async () => {
    const respone = await requests(app).get('/api/product/my-product').set('token', tokenSeller);
    expect(respone.statusCode).toBe(200);
  });
  test('should return response object', async () => {
    const respone = await requests(app).get('/api/product/my-product').set('token', tokenSeller);
    expect(respone.body).toMatchObject(standarResponse);
  });
  test('should return response standar response data product', async () => {
    const respone = await requests(app).get('/api/product/my-product').set('token', tokenSeller);
    expect(respone.body.data[0]).toEqual(expect.objectContaining({
      id: expect.any(Number),
      name: expect.any(String),
      price: expect.any(Number),
      brand: expect.any(String),
      categories: expect.any(String),
      score: expect.any(Array),
      stock: expect.any(Number),
      image: expect.any(String),
      description: expect.any(String),
      condition: expect.any(String),
      idUser: expect.stringContaining('emailTest@gmail.com'),
      createdAt: expect.any(String),
      updatedAt: expect.any(String),
    }));
  });
});

describe('edit stock product', () => {
  test('return edit success', async () => {
    const result = await requests(app).put('/api/product/edit-stock').set('token', tokenSeller)
      .send({
        id: 3,
        id_product: 3,
        stock: 5,
      });
    expect(result.body.message).toBe('data updated');
  });
});
