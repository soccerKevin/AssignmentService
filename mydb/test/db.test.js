import { courseDefinition, courseData } from 'sa/test/fixtures/db.js'
import createTables from '../config/createTables.js'
import DB from '../db.js'
import Table from '../table/table.js'
import Search from '../search.js'
import Where from '../where.js'

describe('db', () => {
  describe('', () => {
    let search, whereId1, db

    beforeEach(() => {
      db = new DB()
    })

    beforeAll(() => {
      whereId1 = new Where({ field: 'id', comparison: '=', value: 1 })
      search = new Search({ table: 'course', wheres: [whereId1] })
    })

    beforeEach(() => {
      db = new DB()
      db.addTable('course', new Table(courseDefinition))
      db.insert('course', courseData)
    })

    test('finds a row', () => {
      expect(db.find(search).length).toBe(1)
      expect(db.find(search)[0]).toEqual({ id: 1, ...courseData[1] })
    })

    test('updates a row', () => {
      const newProps = { credits: 5, capacity: 2 }
      const result = db.update(search, newProps)
      expect(result.length).toBe(1)
      expect(result[0]).toEqual({ id: 1, ...courseData[1], ...newProps })
    })

    test('deletes a row', () => {
      db.delete(search)
      expect(db.find(search)).toEqual([])
    })
  })

  describe('joins', () => {
    let db
    const courseStudent = { student_id: 0, course_id: 2, grade: 3.2 }
    const student = { name: 'smurf', credit_capacity: 12 }

    beforeAll(() => {
      db = new DB()
      createTables(db)
    })

    test('joins 2 tables', () => {
      db.insert('student', student)
      db.insert('course_student', courseStudent)
      const leftWhere = new Where({ field: 'id', comparison: '=[]', value: [0] })
      const leftSearch = new Search({ table: 'student', wheres: [leftWhere] })
      const rightWhere = new Where({ field: 'student_id', comparison: '=[]', value: [] })
      const rightSearch = new Search({ table: 'course_student', wheres: [rightWhere] })
      const joinedRows = db.leftJoin({ leftSearch, rightSearch, leftColumn: 'id', rightColumn: 'student_id' })
      const cs = {}
      Object.entries(courseStudent).forEach(([key, value]) => {
        if (student[key] !== undefined) {
          cs[`course_student.${key}`] = value
        } else {
          cs[key] = value
        }
      })
      const j = { id: 0, 'course_student.id': 0, ...cs, ...student }
      expect(joinedRows[0]).toEqual(j)
    })
  })
})

