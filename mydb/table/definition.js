import { typesArray } from '../types.js'
import isPlainObject from '../helpers/isPlainObject.js'

const isValidName = (name) => name && !name.match(/[`!@#$%^&*()+\-=\[\]{};':"\\|,.<>\/?~]/g)

const isValidType = (type) => type && typesArray.includes(type)

class Definition {
  constructor(columns) {
    this.cols = validateColumns(columns)
  }

  indexedColumns() {
    if (this.indexes) return this.indexes
    this.indexes = Object.entries(this.cols).map(([colName, { indexed }]) =>
      indexed ? colName : null
    ).filter((n) => n)
    return this.indexes
  }
}

const validateColumns = (columns) => {
  if (!isPlainObject(columns))
    throw new Error('Invalid column definition: ', columns)

  const cols = Object.entries.map(([n, { type: t, indexed=false, unique=false }]) => {
    const name = n.toLowerCase()
    const type = t.toLowerCase()

    if (!isValidName) throw new Error('Invalid column name: ', name, type)
    if (!isValidType) throw new Error('Invalid column type: ', name, type)
    return { name, props: { type, indexed } }
  })

  return cols
}

export default Definition
