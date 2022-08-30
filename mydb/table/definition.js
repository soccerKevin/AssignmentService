import { typesArray } from '../types.js'
import isPlainObject from '../helpers/isPlainObject.js'

const isValidName = (name) => name && !name.match(/[`!@#$%^&*()+\-=\[\]{};':"\\|,.<>\/?~]/g)

const isValidType = (type) => type && typesArray.includes(type)

const filterProps = ({ type, indexed, unique }) => ({ type, indexed, unique })

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

  const cols = {}

  Object.entries(columns).forEach(([n, props]) => {
    const name = n.toLowerCase()
    const type = props.type.toLowerCase()

    if (!isValidName(name)) throw new Error('Invalid column name: ', name, type)
    if (!isValidType(type)) throw new Error('Invalid column type: ', name, type)

    cols[name] = filterProps(props)
  })

  return cols
}

export default Definition
