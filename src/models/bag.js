const bag = {};
const db = require('../configs/db');

bag.getAllBag = () => new Promise((resolve, reject) => {
  db.query('SELECT public.bag.*, public.product.title, public.product.price, public.product.store, public.product.image FROM public.bag INNER JOIN public.product ON public.bag.product_id = public.product.id ORDER BY create_at DESC')
    .then((res) => {
      const json = res.rows.map((data) => {
        const totalPrice = data.qty * data.price;
        const object = {
          id: data.id,
          product_id: data.product_id,
          product_title: data.title,
          product_store: data.store,
          product_price: data.price,
          qty: data.qty,
          total_price: totalPrice,
          create_at: data.create_at,
          update_at: data.update_at,
        };
        return object;
      });
      resolve(json);
    })
    .catch((err) => {
      reject(err.message);
    });
});

bag.getBagById = (id) => new Promise((resolve, reject) => {
  db.query('SELECT public.bag.*, public.product.title, public.product.price, public.product.store, public.product.image FROM public.bag INNER JOIN public.product ON public.bag.product_id = public.product.id WHERE public.bag.id=$1', [id])
    .then((res) => {
      if (res.rowCount) {
        resolve(res.rows);
      } else {
        resolve({ error: true, message: 'Category ID not found!' });
      }
    })
    .catch((err) => {
      reject(err.message);
    });
});

bag.addBag = (data) => new Promise((resolve, reject) => {
  const { productId, qty } = data;
  const createAt = new Date();
  db.query('INSERT INTO public.bag (product_id, qty, create_at, update_at) VALUES($1,$2,$3,$4)',
    [productId, qty, createAt, createAt])
    .then(((res) => {
      if (res.rowCount) {
        resolve({ message: 'New bag successfully added' });
      } else {
        resolve({ message: 'gagal' });
      }
    }))
    .catch((err) => {
      reject(err.message);
    });
});

bag.updateBag = (data) => new Promise((resolve, reject) => {
  const updateAt = new Date();
  const { qty, id } = data;
  db.query('UPDATE public.bag SET qty=$1, update_at=$2 WHERE id=$3',
    [qty, updateAt, id])
    .then((res) => {
      if (res.rowCount) {
        resolve({ message: 'Data successfully changed' });
      }
    })
    .catch((err) => {
      reject(err);
    });
});

bag.deleteBag = (key) => new Promise((resolve, reject) => {
  db.query('DELETE FROM public.bag WHERE id=$1', [key.id])
    .then((res) => {
      if (res.rowCount) {
        resolve({ message: 'Data deleted successfully' });
      }
    })
    .catch((err) => {
      reject(err);
    });
});

module.exports = bag;
