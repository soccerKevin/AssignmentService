import Column from './column.js'

class Definition {
  constructor(columns) {
    validateColumns(columns)
    this.cols = {}
    columns.forEach(({ name, ...props }) => this.cols[name] = props)
  }

  indexedColumns() {
    if (this.indexes) return this.indexes
    this.indexes = Object.entries(this.cols).map(([name, { indexed, unique }]) =>
      indexed || unique ? name : null
    ).filter((n) => n)
    return this.indexes
  }

  addColumn(column) {
    validateColumn(column)
    const { name } = column
    if (this.cols.name)
      throw new Error(`Can't add column ${name}, already exists`)

    this.cols[name] = column
    this.indexes = null
  }

  removeColumn(columnName) {
    if (!this.cols[columnName])
      throw new Error(`Can't remove column ${columnName}, does not exist`)
    delete this.cols[columnName]
  }
}

const validateColumns = (columns) =>
  columns.map((column) => validateColumn(column))

const validateColumn = (column) => {
  if (!column instanceof Column)
    throw new Error(`Column ${column} must be of type Column`)
}


export default Definition
