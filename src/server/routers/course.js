import express from 'express'
import { connect } from 'sa/db/index.js'
import { acceptParams } from './params.js'
const { pool } = connect
const router = express.Router()

const accepted = ['id', 'name', 'startDate', 'endDate', 'credits', 'capacity']

router.use('*', acceptParams(accepted))

router.get('/:id', async ({ params: { id } }, res) => {
  const { rows } = await pool.query("SELECT * FROM course WHERE id=$1;", [id])
  res.send(rows[0])
})

router.post('', async ({ accepted: { keys, vars, values } }, res) => {
  const { rows } = await pool.query(`
    INSERT INTO course (${keys})
    VALUES (${vars})
    RETURNING *;
  `, values)

  res.send(rows[0])
})

router.put('/:id', async ({ params: { id }, accepted: { keys, keyValues, values } }, res) => {
  const { rows } = await pool.query(`
    UPDATE course SET ${keyValues}
    WHERE id = ${id}
    RETURNING ${keys};
  `)

  res.send(rows[0])
})

const path = '/course'
export { path, router }
