import express from 'express'
import { connect } from 'sa/db/index.js'
const { pool } = connect
const router = express.Router()

export const path = '/registration'
export const acceptedParams = ['courseId', 'studentId', 'grade']

router.post('', async ({ accepted: { keys, vars, values } }, res) => {
  const { rows } = await pool.query(`
    INSERT INTO course_student (${keys})
    VALUES (${vars})
    RETURNING *
  ;`, values)

  res.send(rows[0])
})

router.put('/update', async ({ accepted: { params: { grade, student_id, course_id } } }, res) => {
  const { rows } = await pool.query(`
    UPDATE course_student
    SET grade = ${grade}
    WHERE student_id=${student_id} AND course_id=${course_id}
    RETURNING
      student_id as studentId,
      course_id as courseId,
      grade
    ;`)
  res.send(rows[0])
})


router.delete('', async ({ accepted: { params: { course_id, student_id }, keys } }, res) => {
  const { rows } = await pool.query(`
    DELETE FROM course_student
    WHERE course_id = course_id AND student_id = student_id
    RETURNING ${keys}
  ;`)

  res.send(rows[0])
})

export { router }
