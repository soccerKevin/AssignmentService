import Struct from '../helpers/struct.js'

export const ACTIONS = [
  'CREATE',
  'READ',
  'UPDATE',
  'DELETE'
]

const base = {
  columns: null,
  actions: null,
  func: null,
}

const allowed = Object.keys(base)

const validateColumns = (columns) => {
  if (!columns) throw new Error('A trigger must have a column')
}

const validateActions = (actions) => {
  if (!actions) throw new Error('A trigger must have an action')
}

const validateFunc = (func) => {
  if (!func) throw new Error('A trigger must have a callback function')
  if (!func instanceof Function) throw new Error('A trigger must have a callback function')
}

const validateProps = (props) => {
  const { columns, actions, func } = { ...base, ...props }
  validateColumns(columns)
  validateActions(actions)
  validateFunc(func)
  return { columns, actions, func }
}

// triggers look like { columns, actions, function(row) }
class Trigger extends Struct {
  #props
  constructor(props) {
    super({ props, validateProps, allowed, base })
  }
}

export default Trigger
