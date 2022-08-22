import express from 'express'
import { connect } from 'sa/db/index.js'
import { toLetter } from 'sa/src/helpers/grade.js'
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

router.get('/:id/courses', async ({ params: { id } }, res) => {
  const { rows } = await pool.query(`
    SELECT course.id, name
    FROM course
    LEFT JOIN course_student ON course.id = course_student.course_id
    WHERE course_student.student_id=$1;`,
    [id]
  )
  res.send(rows)
})

router.get('/:studentId/course/:courseId/grade', async ({ params: { studentId, courseId } }, res) => {
  const { rows } = await pool.query(`
    SELECT grade
    FROM course_student
    WHERE student_id=$1 AND course_id=$2;`,
    [studentId, courseId]
  )
  console.log('rows: ', rows)
  const { grade } = rows[0]
  const letter = toLetter(grade)
  res.send({ decimal: grade, letter })
})

export { router }
