import Table from '../table.js'
import Where from '../where.js'

import { validDefinition, data } from 'sa/test/fixtures.js'

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
      record = table.insertRow(data[0])
      record = table.insertRow(data[1])
    })

    test('adding returns props with a new id', () => {
      expect(table.insertRow(data[2])).toEqual({ id: 2, ...data[2] })
    })

    test('adding saves a row in data', () => {
      expect(table.getRowByIndex(record.id)).toEqual(record)
    })

    describe('findRows', () => {
      let whereId, whereIds, whereAddress
      beforeEach(() => {
        whereId = new Where({ field: 'id', comparison: '=', value: 0 })
        whereIds = new Where({ field: 'ids', comparison: '=[]', value: [0, 1] })
        whereAddress = new Where({ field: 'address', comparison: '=', value: data[1].address })
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

      test('finds by ids', () => {
        const result = table.findRows([whereIds])
        expect(result[0]).toEqual({ id: 0, ...data[0] })
        expect(result[1]).toEqual({ id: 1, ...data[1] })
      })

      test('finds by unique (with index)', () => {
        const result = table.findRows([whereAddress])
        expect(result[0]).toEqual({ id: 1, ...data[1] })
      })
    })
  })
})
