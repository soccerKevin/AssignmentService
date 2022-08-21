import express from 'express'
import { connect } from 'sa/db/index.js'
const { pool } = connect
const router = express.Router()

export const path = '/student'
export const acceptedParams = ['id', 'name', 'creditCapacity']

router.get('/:id', async ({ params: { id } }, res) => {
  const { rows } = await pool.query("SELECT * FROM student WHERE id=$1;", [id])
  res.send(rows[0])
})

router.post('', async ({ accepted: { keys, vars, values } }, res) => {
  const { rows } = await pool.query(`
    INSERT INTO student (${keys})
    VALUES (${vars})
    RETURNING *;
  `, values)

  res.send(rows[0])
})

router.put('/:id', async ({ params: { id }, accepted: { keys, keyValues, values } }, res) => {
  const { rows } = await pool.query(`
    UPDATE student SET ${keyValues}
    WHERE id = ${id}
    RETURNING ${keys};
  `)

  res.send(rows[0])
})

export { router }
