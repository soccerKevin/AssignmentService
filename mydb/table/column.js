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

// columns look like { name, type, indexed, unique }
class Column {
  constructor(props) {
    const validatedProps = validateProps(props)
    allowed.forEach((allowed) => this[allowed] = validatedProps[allowed])
  }
}

const validateProps = (column) => {
  const { name: n, type: t, ...props } = column
  const name = n.toLowerCase()
  const type = t.toLowerCase()

  if (!isValidName(name)) throw new Error('Invalid column name: ', name, type)
  if (!isValidType(type)) throw new Error('Invalid column type: ', name, type)

  return { name, type, ...props }
}

export default Column
