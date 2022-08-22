import express from 'express'
import { connect } from 'sa/db/index.js'
const { pool } = connect
const router = express.Router()

export const path = '/register'
export const acceptedParams = ['courseId', 'studentId']

router.post('', async ({ accepted: { keys, vars, values } }, res) => {
  const { rows } = await pool.query(`
    INSERT INTO course_student (${keys})
    VALUES (${vars})
    RETURNING *;
  `, values)

  res.send(rows[0])
})

router.delete('', async ({ accepted: { params: { course_id, student_id }, keys } }, res) => {
  const { rows } = await pool.query(`
    DELETE FROM course_student
    WHERE course_id = course_id AND student_id = student_id
    RETURNING ${keys};
  `)

  res.send(rows[0])
})

export { router }
