require('dotenv/config');
// const dotenv = require('dotenv');
const cors = require('cors');
const express = require('express');

const server = express();
const main = require('./src/main');

server.use(cors());
server.use('/api/public', express.static('public'));
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use('/api/', main);

// if (process.env.APP_STATUS === 'test') {
//   console.log('test');
//   dotenv.config({ path: `${__dirname}/.env.development` });
// }
// if (process.env.APP_STATUS === 'dev') {
//   console.log('dev');
//   dotenv.config({ path: `${__dirname}/.env.development` });
// }

module.exports = server;
