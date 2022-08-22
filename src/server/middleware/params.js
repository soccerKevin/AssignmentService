export const acceptParams = (accepted) => (req, res, next) => {
  const { body } = req
  const params = {}
  req.accepted = {}
  accepted.forEach((param) => body[param] ? params[camelToSnakeCase(param)] = body[param] : null)
  req.accepted.params = params
  req.accepted.keys = keys(params).join(', ')
  req.accepted.vars = vars(params).join(', ')
  req.accepted.keyValues = keyValues(params).join(', ')
  req.accepted.values = values(params)
  next()
}

export const keys = (params) => Object.keys(params).map((key) => camelToSnakeCase(key))

export const vars = (params) => new Array(Object.keys(params).length).fill(0).map((elem, i) => `$${i + 1}`)

export const keyValues = (params) => {
  const k = keys(params)
  const v = values(params)
  return k.map((key, i) => `${key} = '${v[i]}'`)
}

export const values = (params) => Object.values(params)

const camelToSnakeCase = (str) => str.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);
