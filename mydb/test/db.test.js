import { courseDefinition, courseData } from 'sa/test/fixtures/db.js'
import DB from '../db.js'
import Table from '../table/table.js'
import Search from '../search.js'
import Where from '../where.js'

describe('db', () => {
  let db

  beforeEach(() => {
    db = new DB()
    db.addTable('course', new Table(courseDefinition))
    db.insert('course', courseData)
  })

  describe('', () => {
    let search, whereId1

    beforeAll(() => {
      whereId1 = new Where({ field: 'id', comparison: '=', value: 1 })
      search = new Search({ table: 'course', wheres: [whereId1] })
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
  })
})
