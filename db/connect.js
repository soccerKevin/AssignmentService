const { Pool, Client } = require('pg');

const pool = new Pool({
  host: 'localhost',
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  database: process.env.PGDATABASE,
  port: process.env.PGPORT,
});

module.exports = { pool };
