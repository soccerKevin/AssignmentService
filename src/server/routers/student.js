import express from 'express'
import { dbconn } from 'sa/pgdb/connection.js'
import { toLetter } from 'sa/src/helpers/grade.js'
import { db, Search, Where } from 'sa/mydb/index.js'
const router = express.Router()

export const path = '/student'
export const acceptedParams = ['id', 'name', 'creditCapacity']

router.get('/:id', async ({ params: { id } }, res) => {
  const where = new Where({ field: 'id', comparison: '=', value: id })
  const search = new Search({ table: 'student', wheres: [where] })
  const rows = db.find(search)
  res.send(rows[0])
})

router.post('', async ({ accepted: { params } }, res) => {
  const rows = db.insert('student', params)
  res.send(rows[0])
})

router.put('/:id', async ({ params: { id }, accepted: { params } }, res) => {
  const where = new Where({ field: 'id', comparison: '=', value: id })
  const search = new Search({ table: 'student', wheres: [where] })
  const rows = db.update(search, params)
  res.send(rows[0])
})

router.get('/:id/courses', async ({ params: { id } }, res) => {
  const leftWhere = new Where({ field: 'student_id', comparison: '=', value: id })
  const leftSearch = new Search({ table: 'course_student', wheres: [leftWhere] })
  const rightWhere = new Where({ field: 'id', comparison: '=[]', value: [] })
  const rightSearch = new Search({ table: 'course', wheres: [rightWhere] })
  const rows = db.leftJoin({ leftSearch, rightSearch, leftColumn: 'course_id', rightColumn: 'id' })
  res.send(rows)
})

router.get('/:id/grade/average', async ({ params: { id } }, res) => {
  const { rows } = await dbconn.query(`
    SELECT
      SUM(COALESCE(grade, 0)) AS total,
      COUNT(*) as count
    FROM course_student
    WHERE student_id=$1;`,
    [id]
  )
  const { total, count } = rows[0]
  const decimal = total / count
  const letter = toLetter(decimal)
  res.send({ decimal, letter })
})

router.get('/:studentId/course/:courseId/grade', async ({ params: { student_id, course_id } }, res) => {
  const studentWhere = new Where({ field: 'student_id', comparison: '=', value: student_id })
  const courseWhere = new Where({ field: 'course_id', comparison: '=', value: course_id })
  const search = new Search({ table: 'course_student', wheres: [studentWhere, courseWhere] })
  const rows = db.find(search)

  if (rows.length) {
    const { grade } = rows[0]
    const letter = toLetter(grade)
    res.send({ decimal: grade, letter })
  } else {
    res.status(400).send()
  }
})

export { router }
