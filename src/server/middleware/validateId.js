export const path = '*'

export const middleware = ({ params: { id } }, res, next) => {
  if (id && isNaN(parseInt(id)))
    return res.send({ status: 400 })
  next()
}
