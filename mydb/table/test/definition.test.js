import Definition from '../definition.js'

describe('definition', () => {
  const validDefinition = [
    { name: 'column1', unique: true, indexed: true, type: 'string' },
    { name: 'column2', unique: false, indexed: false, type: 'int' },
  ]

  test('valid definition is ok', () => {
    expect(() => new Definition(validDefinition)).not.toThrow()
  })

  test('saves indexed columns', () => {
    expect(new Definition(validDefinition).indexedColumns()).toEqual(['column1'])
  })

  test('invalid column name', () => {
    expect(() => new Definition({ name: 'column.1', type: 'string' })).toThrow()
  })

  test('invalid column type', () => {
    expect(() => new Definition({ name: 'column1', type: 'who' })).toThrow()
  })

  describe('returns indexed columns', () => {
    let d
    beforeEach(() => d = new Definition(validDefinition))

    test('on define', () => {
      expect(d.indexedColumns()).toEqual(['column1'])
    })

    test('on add column', () => {
      d.addColumn({ name: 'column3', indexed: true, type: 'string' })
      expect(d.indexedColumns()).toEqual(['column1', 'column3'])
    })
  })
})
