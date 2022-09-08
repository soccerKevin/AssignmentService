export const middleware = ({ method, originalUrl, params, query }, res, next) => {
  console.log('Request.......................')
  console.log(method, ': ', originalUrl)
  next()
}
