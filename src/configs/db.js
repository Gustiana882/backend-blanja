const { Pool } = require('pg');

const pool = new Pool({
  user: 'devops',
  host: 'localhost',
  database: 'express',
  password: 'admin123',
  port: 5432,
});

module.exports = pool;
