import dotenv from 'dotenv'
dotenv.config();
import express from 'express'
import webpack from 'webpack'
import path from 'path'
import webpackDevMiddleware from 'webpack-dev-middleware'
import bodyParser from 'body-parser'
import webpackConfig from 'sa/webpack.config.js'
import * as routers from 'sa/src/server/routers/index.js'
import * as middlewares from 'sa/src/server/middleware/index.js'
import { acceptParams } from './middleware/params.js'


const routersArray = Object.values(routers)
const middlewareArray = Object.values(middlewares)

const compiler = webpack(webpackConfig);

const app = express();

const port = 3000;

app.use(
  webpackDevMiddleware(compiler, {
    publicPath: webpackConfig.output.publicPath,
  })
)

app.use(bodyParser.json());

middlewareArray.forEach(({ path, middleware }) => {
  app.use(path, middleware)
})

routersArray.forEach(({ path, router, acceptedParams }) => {
  if (acceptedParams) app.use(path, acceptParams(acceptedParams))
  app.use(path, router)
})

app.listen(port, () => {
  console.log(`Listening on port ${port}!`)
})
