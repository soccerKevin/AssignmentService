import express from 'express'
import { dbconn } from 'sa/pgdb/connection.js'
import { db, Search, Where } from 'sa/mydb/index.js'
const router = express.Router()

export const path = '/registration'
export const acceptedParams = ['courseId', 'studentId', 'grade']

// const where = new Where({ field: 'id', comparison: '=', value: id })
// const search = new Search({ table: 'course', wheres: [where] })
router.post('', async ({ accepted: { params } }, res) => {
  const rows = db.insert('course_student', params)
  res.send(rows[0])
})

router.put('/update', async ({ accepted: { params, params: { grade, student_id, course_id } } }, res) => {
  const studentWhere = new Where({ field: 'student_id', comparison: '=', value: student_id })
  const courseWhere = new Where({ field: 'course_id', comparison: '=', value: course_id })
  const search = new Search({ table: 'course_student', wheres: [studentWhere, courseWhere] })
  const rows = db.update(search, params)
  res.send(rows[0])
})

router.delete('', async ({ accepted: { params: { course_id, student_id }, keys } }, res) => {
  const studentWhere = new Where({ field: 'student_id', comparison: '=', value: student_id })
  const courseWhere = new Where({ field: 'course_id', comparison: '=', value: course_id })
  const search = new Search({ table: 'course_student', wheres: [studentWhere, courseWhere] })
  const rows = db.delete(search)
  const status = rows.length ? 200 : 404
  res.status(status).send(rows[0])
})

export { router }
