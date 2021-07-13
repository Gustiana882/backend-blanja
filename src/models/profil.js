const db = require('../configs/db');

const profil = {};

profil.getUserByEmail = (email) => new Promise((resolve, reject) => {
  db.query(`SELECT * FROM public.users WHERE public.users.email = '${email}'`)
    .then((res) => {
      resolve(res.rows);
    })
    .catch((err) => {
      reject(err);
    });
});

profil.editProfil = (data) => new Promise((resolve, reject) => {
  const time = new Date();
  const { email, name, image } = data;
  db.query(`UPDATE public.users SET "name"=$1, image=$2, update_at=$3 WHERE email='${email}'`, [name, image, time])
    .then((res) => {
      resolve(res.rowCount);
    })
    .catch((err) => {
      reject(err);
    });
});

profil.editPassword = (data) => new Promise((resolve, reject) => {
  const time = new Date();
  const { email, password } = data;
  db.query(`UPDATE public.users SET "password"=$1, update_at=$2 WHERE email='${email}'`, [password, time])
    .then((res) => {
      resolve(res.rowCount);
    })
    .catch((err) => {
      reject(err);
    });
});

module.exports = profil;
