import Struct from '../helpers/struct.js'

export const ACTIONS = [
  'CREATE',
  'UPDATE',
]

const base = {
  actions: null,
  func: null,
}

const allowed = Object.keys(base)

const validateActions = (actions) => {
  if (!actions) throw new Error('A trigger must have an action')
  actions.forEach((action) => {
    if (!ACTIONS.includes(actions)) throw new Error(`A trigger action must be one of ${ACTIONS.join(', ')}`)
  })
}

// functions will be passed, row
const validateFunc = (func) => {
  if (!func) throw new Error('A trigger must have a callback function')
  if (!func instanceof Function) throw new Error('A trigger must have a callback function')
}

const validateProps = (props) => {
  const { actions, func } = { ...base, ...props }
  validateActions(actions)
  validateFunc(func)
  return { actions, func }
}

// triggers look like { columns, actions, function(row) }
class Trigger extends Struct {
  #props
  constructor(props) {
    super({ props, validateProps, allowed, base })
  }
}

export default Trigger
