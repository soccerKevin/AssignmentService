import Table from '../table.js'
import Definition from '../definition.js'
import Column from '../column.js'

describe('table', () => {
  const validDefinition = new Definition([
    new Column({ name: 'column1', unique: true, indexed: true, type: 'string' }),
    new Column({ name: 'column2', unique: false, indexed: false, type: 'int' }),
  ])

  test('has indexes', () => {
    expect(() => new Table(validDefinition)).not.toThrow()
  })
})
