import Where from './where.js'
import Struct from './helpers/struct.js'

const base = {
  table: null,
  wheres: null,
}

const allowed = Object.keys(base)

const validateProps = ({ table, wheres }) => {
  if (!(typeof(table) === 'string'))
    throw new Error('table name must be a string')

  if (!(wheres instanceof Array))
    throw new Error('wheres must be an array of wheres')

  return { table, wheres }
}

class Search extends Struct {
  constructor(props) {
    super({ props, validateProps, allowed, base })
  }
}

export default Search
