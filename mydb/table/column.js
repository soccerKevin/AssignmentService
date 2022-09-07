import Struct from '../helpers/struct.js'
import { typesArray } from '../types.js'

const isValidName = (name) => name && !name.match(/[`!@#$%^&*()+\-=\[\]{};':"\\|,.<>\/?~]/g)

const isValidType = (type) => type && typesArray.includes(type)

const base = {
  name:    null,
  type:    null,
  indexed: false,
  unique:  false,
}

const allowed = Object.keys(base)

const validateProps = (column) => {
  const { name: n, type: t, indexed, unique } = column
  const name = n.toLowerCase()
  const type = t.toLowerCase()

  if (!name || !isValidName(name)) throw new Error(`Invalid column name: ${name}: ${type}`)
  if (!type || !isValidType(type)) throw new Error(`Invalid column type: ${name}: ${type}`)

  return { name, type, indexed, unique }
}

// columns look like { name, type, indexed, unique }
class Column extends Struct {
  constructor(props) {
    super({ props, validateProps, allowed, base })
  }
}

export default Column
