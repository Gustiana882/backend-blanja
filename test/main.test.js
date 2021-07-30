/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */

require('dotenv/config');
const requests = require('supertest');
const app = require('../app');
const { sequelize } = require('../src/configs/db');

let token;
const userData = {
  name: 'test',
  email: 'emailTest@gmail.com',
  password: 'test1234',
};

/**
 * data response standar API
 */

const standarCategory = {
  id: expect.any(Number),
  name: expect.any(String),
  image: expect.any(String),
  createdAt: expect.any(String),
  updatedAt: expect.any(String),
};

const standarProduct = {
  id: expect.any(Number),
  title: expect.any(String),
  price: expect.any(Number),
  brand: expect.any(String),
  categories: expect.objectContaining({
    id: expect.any(Number),
    name: expect.any(String),
  }),
  star: expect.any(Number),
  review: expect.any(Number),
  image: expect.any(String),
  createdAt: expect.any(String),
  updatedAt: expect.any(String),
};

const createDataBase = async () => {
  await sequelize.sync({ force: true });
};
beforeAll(async () => {
  await createDataBase();
});

describe('TEST CRUD REQUEST', () => {
  /**
   * @service request route register
   */
  describe('service register', () => {
    test('should return register success', async () => {
      const result = await requests(app).post('/register').send({
        name: userData.name,
        email: userData.email,
        password: userData.password,
      });
      expect(result.body.data[0].message).toEqual(expect.stringContaining('register success'));
      expect(result.statusCode).toBe(200);
    });

    test('should return register gagal e-mail already registered', async () => {
      const result = await requests(app).post('/register').send({
        name: userData.name,
        email: userData.email,
        password: userData.password,
      });
      expect(result.statusCode).toBe(400);
      expect(result.body.data[0].message).toEqual(expect.stringContaining('e-mail already registered'));
    });
  });
  /**
   * @service request route login
   */
  describe('service login', () => {
    test('should return token jwt', async () => {
      const result = await requests(app).post('/login').send({
        email: userData.email,
        password: userData.password,
      });
      token = result.body.data[0].token_key;
      expect(result.statusCode).toBe(200);
      expect(result.body.data[0].message).toEqual(expect.stringContaining('login berhasil!'));
      expect(result.body.data[0].token_key).toEqual(expect.stringContaining('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9'));
    });
  });

  /**
   * @service request route category product
   */

  describe('service category', () => {
    /**
   * POST category
   */

    describe('POST Category', () => {
      test('should return response post category', async () => {
        const respone = await requests(app)
          .post('/product/category')
          .set('token', token)
          .send({ name: 'baju' });
        expect(respone.statusCode).toBe(200);
      });
    });

    /**
   * PUT category
   */

    describe('PUT Category', () => {
      test('should return response edit category success', async () => {
        const respone = await requests(app)
          .put('/product/category')
          .set('token', token)
          .send({
            id: 1,
            name: 'baju-muslim',
          });
        expect(respone.body.data[0].message).toEqual(expect.stringContaining('edit category is success'));
        expect(respone.statusCode).toBe(200);
      });
    });

    /**
   * DELETE category
   */

    describe('DELETE Category', () => {
      test('should return response delete category success', async () => {
        // create category for trying method delete
        await requests(app)
          .post('/product/category')
          .set('token', token)
          .send({ name: 'baju' });

        const respone = await requests(app)
          .delete('/product/category/2')
          .set('token', token);
        expect(respone.body.data[0].message).toEqual(expect.stringContaining('category success to delete'));
        expect(respone.statusCode).toBe(200);
      });
    });

    /**
   * GET category
   */

    describe('GET Category', () => {
      test('should return response status code 200', async () => {
        const respone = await requests(app).get('/product/category');
        expect(respone.statusCode).toBe(200);
      });
      test('should return response standar', async () => {
        const respone = await requests(app).get('/product/category');
        expect(respone.body).toMatchObject({
          status: expect.any(Number),
          description: expect.any(String),
          isError: expect.any(Boolean),
          data: expect.any(Array),
        });
      });
      test('should return response standar data category', async () => {
        const respone = await requests(app).get('/product/category');
        expect(respone.body.data[0]).toEqual(expect.objectContaining(standarCategory));
      });
    });
  });

  /**
   * @service request route product
   */

  describe('service product', () => {
    /**
   * POST Product
   */

    describe('POST Product', () => {
      test('should return response post product', async () => {
        const respone = await requests(app)
          .post('/product')
          .set('token', token)
          .send({
            title: 'baju',
            category: 1,
            price: 10000,
            brand: 'toko kami',
            review: 21,
            star: 4,
          });
        expect(respone.statusCode).toBe(200);
      });
    });

    /**
   * PUT Product
   */

    describe('PUT Product', () => {
      test('should return response edit product success', async () => {
        const respone = await requests(app)
          .put('/product')
          .set('token', token)
          .send({
            id: 1,
            title: 'baju',
            category: 1,
            price: 10000,
            brand: 'toko kami',
            review: 21,
            star: 4,
          });
        expect(respone.body.data[0].message).toEqual(expect.stringContaining('data updated'));
        expect(respone.statusCode).toBe(200);
      });
    });

    /**
   * DELETE Product
   */

    describe('DELETE Product', () => {
      test('should return response delete product success', async () => {
        // create new product for trying method delete product
        await requests(app)
          .post('/product')
          .set('token', token)
          .send({
            title: 'baju',
            category: 1,
            price: 10000,
            brand: 'toko kami',
            review: 21,
            star: 4,
          });
        const respone = await requests(app)
          .delete('/product/2')
          .set('token', token);
        expect(respone.body.data[0].message).toEqual(expect.stringContaining('data success to delete'));
        expect(respone.statusCode).toBe(200);
      });
    });

    /**
 * GET Product
 */
    describe('GET Product', () => {
      test('should return response status code 200', async () => {
        const respone = await requests(app).get('/product');
        expect(respone.statusCode).toBe(200);
      });
      test('should return response object', async () => {
        const respone = await requests(app).get('/product');
        expect(respone.body).toMatchObject({
          status: expect.any(Number),
          description: expect.any(String),
          isError: expect.any(Boolean),
          data: expect.any(Array),
        });
      });
      test('should return response standar response data product', async () => {
        const respone = await requests(app).get('/product');
        expect(respone.body.data[0]).toEqual(expect.objectContaining(standarProduct));
      });
    });

    /**
     * GET Product by id
     */

    describe('GET Product By Id', () => {
      test('should return response status code 200', async () => {
        const respone = await requests(app).get('/product/1');
        expect(respone.statusCode).toBe(200);
      });
      test('should return response object', async () => {
        const respone = await requests(app).get('/product/1');
        expect(respone.body).toMatchObject({
          status: expect.any(Number),
          description: expect.any(String),
          isError: expect.any(Boolean),
          data: expect.any(Array),
        });
      });
      test('should return response standar response data product', async () => {
        const respone = await requests(app).get('/product/1');
        expect(respone.body.data[0]).toEqual(expect.objectContaining(standarProduct));
      });
      test('should return response standar response data product by id', async () => {
        const respone = await requests(app).get('/product/1');
        expect(respone.body.data[0]).toEqual(expect.objectContaining(standarProduct));
      });
    });

    /**
     * GET Product by id
     */
    describe('GET Product By Name', () => {
      test('should return response status code 200', async () => {
        const respone = await requests(app).get('/product/baju');
        expect(respone.statusCode).toBe(200);
      });
      test('should return response object', async () => {
        const respone = await requests(app).get('/product/baju');
        expect(respone.body).toMatchObject({
          status: expect.any(Number),
          description: expect.any(String),
          isError: expect.any(Boolean),
          data: expect.any(Array),
        });
      });
      test('should return response standar response data product', async () => {
        const respone = await requests(app).get('/product/baju');
        expect(respone.body.data[0]).toEqual(expect.objectContaining(standarProduct));
      });
      test('should return response standar response data product by nama', async () => {
        const respone = await requests(app).get('/product/baju');
        expect(respone.body.data[0]).toEqual(expect.objectContaining(standarProduct));
      });
      test('should return response product not found if user wrong input url', async () => {
        const respone = await requests(app).get('/product/baja');
        expect(respone.body.data[0].message).toEqual(expect.stringContaining('product not found'));
      });
    });
  });

  /**
   * @service request route bag
   */

  describe('service bag', () => {
    /**
   * POST Bag
   */

    describe('POST requests', () => {
      test('should return response post category', async () => {
        const respone = await requests(app)
          .post('/bag')
          .set('token', token)
          .send({
            productId: 1,
            qty: 2,
          });
        expect(respone.statusCode).toBe(200);
      });
    });

    /**
   * PUT Bag
   */

    describe('PUT requests', () => {
      test('should return response edit category success', async () => {
        const respone = await requests(app)
          .put('/bag')
          .set('token', token)
          .send({
            id: 1,
            productId: 1,
            qty: 3,
          });
        expect(respone.body.data[0].message).toEqual(expect.stringContaining('update data bag success'));
        expect(respone.statusCode).toBe(200);
      });
    });

    /**
   * DELETE Bag
   */

    describe('DELETE requests', () => {
      test('should return response delete category success', async () => {
        // create new bag for trying method delete bag
        await requests(app)
          .post('/bag')
          .set('token', token)
          .send({
            productId: 1,
            qty: 2,
          });
        const respone = await requests(app)
          .delete('/bag/2')
          .set('token', token);
        expect(respone.body.data[0].message).toEqual(expect.stringContaining('delete data bag success'));
        expect(respone.statusCode).toBe(200);
      });
    });

    /**
   * GET Bag
   */

    describe('GET requests', () => {
      test('should return response status code 200', async () => {
        const respone = await requests(app)
          .get('/bag')
          .set('token', token);
        expect(respone.statusCode).toBe(200);
        expect(respone.body).toMatchObject({
          status: expect.any(Number),
          description: expect.any(String),
          isError: expect.any(Boolean),
          data: expect.any(Array),
        });
      });
    });
  });

  /**
   * @service request route Profile
   */

  describe('service profile', () => {
    /**
   * PUT profile
   */

    describe('PUT requests', () => {
      test('should return response status Code', async () => {
        const respone = await requests(app)
          .put('/profile/edit-profile')
          .set('token', token)
          .send({
            name: 'useredit',
          });
        expect(respone.statusCode).toBe(200);
      });
      test('should return response edit profile success', async () => {
        const respone = await requests(app)
          .put('/profile/edit-profile')
          .set('token', token)
          .send({
            name: 'useredit',
          });
        expect(respone.body.data[0].message).toEqual(expect.stringContaining('edit profil success'));
      });
    });

    /**
   * PUT password reset
   */

    describe('PUT requests', () => {
      test('should return response status code 200', async () => {
        const respone = await requests(app)
          .put('/profile/reset-password')
          .set('token', token)
          .send({
            oldPassword: userData.password,
            newPassword: userData.password,
          });
        expect(respone.statusCode).toBe(200);
      });
      test('should return response edit paswword success', async () => {
        const respone = await requests(app)
          .put('/profile/reset-password')
          .set('token', token)
          .send({
            oldPassword: userData.password,
            newPassword: userData.password,
          });
        expect(respone.body.data[0].message).toEqual(expect.stringContaining('edit password success'));
      });
      test('should return response error password wrong! if input oldPaswword wrong', async () => {
        const respone = await requests(app)
          .put('/profile/reset-password')
          .set('token', token)
          .send({
            oldPassword: 'wrong password',
            newPassword: userData.password,
          });
        expect(respone.statusCode).toBe(401);
        expect(respone.body.data[0].message).toEqual(expect.stringContaining('error password wrong!'));
      });
    });

    /**
   * GET profile
   */

    describe('GET requests', () => {
      test('should return response status code 200', async () => {
        const respone = await requests(app)
          .get('/profile')
          .set('token', token);
        expect(respone.statusCode).toBe(200);
      });
      test('should return response standar', async () => {
        const respone = await requests(app)
          .get('/profile')
          .set('token', token);
        expect(respone.body).toMatchObject({
          status: expect.any(Number),
          description: expect.any(String),
          isError: expect.any(Boolean),
          data: expect.any(Array),
        });
      });
    });
  });
});
