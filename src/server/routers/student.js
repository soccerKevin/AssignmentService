import express from 'express'
import { connect } from 'sa/db/index.js'

const { pool } = connect
const router = express.Router()

router.get('/:id', async ({ params: { id } }, res) => {
  const { rows } = await pool.query(`SELECT * FROM student WHERE id=${id};`)
  res.send(rows[0])
})

const path = '/student'
export default { path, router }
