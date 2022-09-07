import express from 'express'
import dbconn from 'sa/pgdb/connection.js'
import { toLetter } from 'sa/src/helpers/grade.js'
const router = express.Router()

import { db, Search, Where } from 'sa/mydb/index.js'

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
  const where = new Where({ field: 'id', comparison: '=', value: id })
  const search = new Search({ table: 'course', wheres: [where] })
  const rows = db.find(search)
  res.send(rows[0])
})

router.get('/:id/grade/average', async ({ params: { id } }, res) => {
  const { rows } = await dbconn.query(`
    SELECT
      SUM(COALESCE(grade, 0)) as total,
      COUNT(*) as count
    FROM course_student
    WHERE course_id=$1;`,
    [id]
  )
  const { total, count } = rows[0]
  const decimal = total / count;
  const letter = toLetter(decimal)
  res.send({ average: { decimal, letter } })
})

router.get('/:id/students', async ({ params: { id } }, res) => {
  const { rows } = await dbconn.query(`
    SELECT student.id, name
    FROM student
    LEFT JOIN course_student ON student.id = course_student.student_id
    WHERE course_student.course_id=$1;`,
    [id]
  )
  res.send(rows)
})

router.post('', async ({ accepted: { params } }, res) => {
  const rows = db.insert('course', params)
  res.send(rows[0])
})

router.put('/:id', async ({ params: { id }, accepted: { keys, keyValues, values } }, res) => {
  const { rows } = await dbconn.query(`
    UPDATE course SET ${keyValues}
    WHERE id = ${id}
    RETURNING ${keys};
  `)

  res.send(rows[0])
})

export { router }
