const express = require('express');

const server = express();
const PORT = 3000;

const main = require('./src/main');
const db = require('./src/configs/db');

server.use(express.json());
server.use(express.urlencoded({ extended: true }));

server.use(main);

db.connect()
  .then(() => {
    server.listen(PORT, () => {
      console.log('connecting to database');
      console.log(`running server at http://localhost:${PORT}`);
    });
  })
  .catch(() => {
    console.log('Error connection database');
  });
