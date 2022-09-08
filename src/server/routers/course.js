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
  const where = new Where({ field: 'course_id', comparison: '=', value: id })
  const search = new Search({ table: 'course_student', wheres: [where] })
  const rows = db.find(search)

  let total = 0
  rows.forEach((row) => total += (row.grade || 0))
  const count = rows.length

  const decimal = total / count;
  const letter = toLetter(decimal)
  res.send({ average: { decimal, letter } })
})

router.get('/:id/students', async ({ params: { id } }, res) => {
  const leftWhere = new Where({ field: 'course_id', comparison: '=', value: id })
  const leftSearch = new Search({ table: 'course_student', wheres: [leftWhere] })
  const rightWhere = new Where({ field: 'id', comparison: '=', value: [] })
  const rightSearch = new Search({ table: 'student', wheres: [rightWhere] })
  const rows = db.leftJoin({ leftSearch, rightSearch, leftColumn: 'course_id', rightColumn: 'id' })
  res.send(rows)
})

router.post('', async ({ accepted: { params } }, res) => {
  const rows = db.insert('course', params)
  res.send(rows[0])
})

router.put('/:id', async ({ params: { id }, accepted: { params } }, res) => {
  const where = new Where({ field: 'id', comparison: '=', value: id })
  const search = new Search({ table: 'course', wheres: [where] })
  const rows = db.update(search, params)
  res.send(rows[0])
})

export { router }
