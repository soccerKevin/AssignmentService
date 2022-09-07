import Column from './column.js'

class Definition {
  constructor(columns) {
    validateColumns(columns)
    this.cols = { id: new Column({
      name:    'id',
      type:    'int',
      indexed: true,
      unique:  true,
    }) }
    columns.forEach((column) => {
      const { name, ...props } = column.getProps()
      this.cols[name] = props
    })
  }

  getCols(row) {
    const allowed = {}
    Object.keys(this.cols).forEach((col) => {
      allowed[col] = row[col]
    })
    return allowed
  }

  indexedColumns() {
    if (this.indexes) return this.indexes
    this.indexes = Object.entries(this.cols).map(([name, { indexed }]) =>
      indexed ? name : null
    ).filter((n) => n)
    return this.indexes
  }

  uniqueColumns() {
    if (this.uniqueCols) return this.uniqueCols
    this.uniqueCols = Object.entries(this.cols).map(([name, { unique }]) =>
      unique ? name : null
    ).filter((n) => n)
    return this.uniqueCols
  }

  addColumn(column) {
    validateColumn(column)
    const colProps = column.getProps()
    const { name } = colProps
    if (this.cols[name])
      throw new Error(`Can't add column ${name}, it already exists`)

    this.cols[name] = colProps
    this.indexes = null
  }

  updateColumn() {
    validateColumn(column)
    const colProps = column.getProps()
    const { name } = colProps
    if (!this.cols[name])
      throw new Error(`Can't update column ${name}, it does not exist`)

    this.cols[name] = colProps
    this.indexes = null
  }

  removeColumn(columnName) {
    if (!this.cols[columnName])
      throw new Error(`Can't remove column ${columnName}, it does not exist`)
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
