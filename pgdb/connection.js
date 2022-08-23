import pg from 'pg'
const { Pool, Client } = pg

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

export const dbconn = new Pool({
  host,
  user: PGUSER,
  password: PGPASSWORD,
  database: PGDATABASE,
  port: PGPORT,
})

export default dbconn

