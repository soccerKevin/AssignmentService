export const middleware = ({ method, originalUrl, params, query }, res, next) => {
  console.log('Request.......................')
  console.log(method, ': ', originalUrl)
  console.log('params: ', params)
  console.log('query: ', query)
  next()
}
