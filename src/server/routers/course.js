import express from 'express'
import { connect } from 'sa/db/index.js'
import { letterGrades } from 'sa/src/constants/index.js'
const { pool } = connect
const router = express.Router()

export const path = '/course'
export const acceptedParams = [
  'id',
  'name',
  'startDate',
  'endDate',
  'credits',
  'capacity'
]

router.get('/:id', async ({ params: { id } }, res) => {
  const { rows } = await pool.query("SELECT * FROM course WHERE id=$1;", [id])
  res.send(rows[0])
})

router.get('/:id/grade/average', async ({ params: { id } }, res) => {
  const { rows } = await pool.query(`
    SELECT
      SUM(COALESCE(grade, 0)) as total,
      COUNT(*) as count
    FROM course_student
    WHERE course_id=$1;`,
    [id]
  )
  const { total, count } = rows[0]
  const decimal = total / count;
  const letter = letterGrades[Math.round(decimal)]
  res.send({ average: { decimal, letter } })
})

router.get('/:id/students', async ({ params: { id } }, res) => {
  const { rows } = await pool.query(`
    SELECT student.id, name
    FROM student
    LEFT JOIN course_student ON student.id = course_student.student_id
    WHERE course_student.course_id=$1;`,
    [id]
  )
  res.send(rows)
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

export { router }
