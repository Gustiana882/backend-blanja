const db = require('../configs/db');

const auth = {};

auth.register = (data) => new Promise((resolve, reject) => {
  const time = new Date();
  const roles = 'user';
  const {
    name, email, password, image,
  } = data;
  db.query('INSERT INTO public.users ("name", email, "password", roles, image, create_at, update_at) VALUES($1, $2, $3, $4, $5, $6, $7)', [name, email, password, roles, image, time, time])
    .then((res) => {
      resolve(res.rowCount);
    })
    .catch((err) => {
      reject(err);
    });
});

auth.getUserByEmail = (email) => new Promise((resolve, reject) => {
  db.query(`SELECT * FROM public.users WHERE public.users.email = '${email}'`)
    .then((res) => {
      resolve(res.rows);
    })
    .catch((err) => {
      reject(err);
    });
});

module.exports = auth;
