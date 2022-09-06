import Table from '../table.js'
import Where from '../../where.js'

import { validDefinition, data } from 'sa/test/fixtures/table.js'

describe('table', () => {
  describe('create', () => {
    test('new with a validDefinition', () => {
      expect(() => new Table(validDefinition)).not.toThrow()
    })

    test('new with an invalidDefinition', () => {
      expect(() => new Table({})).toThrow()
    })
  })

  describe('', () => {
    let table, record

    beforeEach(() => {
      table = new Table(validDefinition)
      table.insertRow(data[0])
      record = table.insertRow(data[1])
    })

    describe('insert', () => {
      test('inserting returns props with a new id', () => {
        expect(table.insertRow(data[2])).toEqual({ id: 2, ...data[2] })
      })

      test('will not insert non unique values', () => {
        expect(() => table.insertRow(data[0])).toThrow()
      })
    })

    describe('findRows', () => {
      let whereId, whereIds, whereAddress, whereGrade

      beforeEach(() => {
        whereId = new Where({ field: 'id', comparison: '=', value: 0 })
        whereIds = new Where({ field: 'id', comparison: '=[]', value: [0, 1] })
        whereAddress = new Where({ field: 'address', comparison: '=', value: data[1].address })
        whereGrade = new Where({ field: 'grade', comparison: '=', value: 4 })
      })

      test('finds by id', () => {
        const result = table.findRows([whereId])
        expect(result[0]).toEqual({ id: 0, ...data[0] })
      })

      test('finds by ids', () => {
        const result = table.findRows([whereIds])
        expect(result[0]).toEqual({ id: 0, ...data[0] })
        expect(result[1]).toEqual({ id: 1, ...data[1] })
      })

      test('finds by unique (with index)', () => {
        const result = table.findRows([whereAddress])
        expect(result[0]).toEqual({ id: 1, ...data[1] })
      })

      test('finds by search (no index)', () => {
        data.slice(2, data.length).map((d) => table.insertRow(d))
        const result = table.findRows([whereGrade])

        expect(result.length).toBe(3)
        expect(result[0].grade).toBe(whereGrade.value)
      })
    })

    describe('update rows', () => {
      let whereId0, whereId1

      beforeEach(() => {
        whereId0 = new Where({ field: 'id', comparison: '=', value: 0 })
        whereId1 = new Where({ field: 'id', comparison: '=', value: 1 })
      })

      test('updates', () => {
        table.updateRows([whereId0], { grade: 1 })
        expect(table.findRows([whereId0])[0].grade).toBe(1)
      })

      test('will not update unique', () => {
        expect(() => table.updateRows(whereId1, { name: data[0].name })).toThrow()
      })
    })
  })
})
