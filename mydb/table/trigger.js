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

// triggers look like { columns, actions, function(row) }
class Trigger {
  constructor(props) {
    const validatedProps = validateProps(props)
    this.#setProps({ ...base, ...validatedProps })
  }

  #setProps(props) {
    allowed.forEach((field) => this[field] = props[field])
  }

  getProps() {
    if (this.#props) return this.#props
    return this.#props = allowed.map((field) => this[`#${field}`])
  }
}

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

export default Trigger
