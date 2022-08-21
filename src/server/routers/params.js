export const acceptParams = (accepted) => (req, res, next) => {
  const { body } = req
  const params = {}
  req.accepted = {}
  accepted.forEach((param) => body[param] ? params[param] = body[param] : null)
  req.accepted.params = params
  req.accepted.keys = keys(params)
  req.accepted.vars = vars(params)
  req.accepted.values = values(params)
  next()
}

export const keys = (params) => Object.keys(params).join(', ')

export const vars = (params) => new Array(Object.keys(params).length).fill(0).map((elem, i) => `$${i + 1}`).join(', ')

export const values = (params) => Object.values(params)
