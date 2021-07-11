require('dotenv/config');
const express = require('express');
const morgan = require('morgan');
const redis = require('./src/configs/redis');

const server = express();
const PORT = 3000;

const main = require('./src/main');
const db = require('./src/configs/db');

server.use(morgan('dev'));
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

server.use(main);

const run = async () => {
  try {
    await db.connect();
    const msg = await redis.check();
    server.listen(PORT, () => {
      console.log('Connection to db');
      console.log(msg);
      console.log(`Service running on port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

run();

// db.connect()
//   .then(() => {
//     server.listen(PORT, () => {
//       console.log('connecting to database');
//       console.log(`running server at http://localhost:${PORT}`);
//     });
//   })
//   .catch(() => {
//     console.log('Error connection database');
//   });
