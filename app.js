require('dotenv/config');
const express = require('express');

const server = express();
const main = require('./src/main');

server.use('/public', express.static('public'));
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(main);

module.exports = server;
