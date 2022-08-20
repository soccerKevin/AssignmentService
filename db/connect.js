const { Pool, Client } = require('pg')

const {
  NODE_ENV,
  PGHOST,
  PGUSER,
  PGPASSWORD,
  PGDATABASE,
  PGPORT,
} = process.env

const envHosts = {
  all: PGHOST,
  dev: 'localhost',
}

const host = envHosts[NODE_ENV]

const pool = new Pool({
  host,
  user: PGUSER,
  password: PGPASSWORD,
  database: PGDATABASE,
  port: PGPORT,
})

module.exports = { pool }
