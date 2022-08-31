import { typesArray } from '../types.js'
import isPlainObject from '../helpers/isPlainObject.js'

const isValidName = (name) => name && !name.match(/[`!@#$%^&*()+\-=\[\]{};':"\\|,.<>\/?~]/g)

const isValidType = (type) => type && typesArray.includes(type)

const filterProps = ({ type, indexed, unique }) => ({ type, indexed, unique })

class Definition {
  constructor(columns) {
    const cols = validateColumns(columns)
    this.cols = {}
    cols.forEach(({ name, ...props }) => this.cols[name] = props)
  }

  indexedColumns() {
    if (this.indexes) return this.indexes
    this.indexes = Object.entries(this.cols).map(([name, { indexed }]) =>
      indexed ? name : null
    ).filter((n) => n)
    return this.indexes
  }

  // columns look like { name, type, indexed, unique }
  addColumn(column) {
    const { name, ...props } = validateColumn(column)
    if (this.cols.name)
      throw new Error(`Can't add column ${name}, already exists`)

    this.cols[name] = props
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
  if (!isPlainObject(column))
    throw new Error('Invalid column definition: ', column)

  const { name: n, type: t, ...props } = column
  const name = n.toLowerCase()
  const type = t.toLowerCase()

  if (!isValidName(name)) throw new Error('Invalid column name: ', name, type)
  if (!isValidType(type)) throw new Error('Invalid column type: ', name, type)

  return { name, type, ...props }
}

export default Definition
