import Definition from '../definition.js'

describe('definition', () => {
  const validDefinition = {
    'column1': { unique: true, indexed: true, type: 'string' },
    'column2': { unique: false, indexed: false, type: 'int' },
  }

  test('valid definition is ok', () => {
    expect(() => new Definition(validDefinition)).not.toThrow()
  })

  test('saves indexed columns', () => {
    expect(new Definition(validDefinition).indexedColumns()).toEqual(['column1'])
  })

  test('invalid column name', () => {
    expect(() => new Definition({ 'column.1': { type: 'string' }})).toThrow()
  })

  test('invalid column type', () => {
    expect(() => new Definition({ 'column1': { type: 'who' }})).toThrow()
  })
})
