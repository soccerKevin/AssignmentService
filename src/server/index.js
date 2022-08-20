import dotenv from 'dotenv'
dotenv.config();
import express from 'express'
import webpack from 'webpack'
import path from 'path'
import webpackDevMiddleware from 'webpack-dev-middleware'
import { connect } from 'sa/db/index.js'
import webpackConfig from 'sa/webpack.config.js'
const compiler = webpack(webpackConfig);

const { pool } = connect
const app = express();

const port = 3000;

// Tell express to use the webpack-dev-middleware and use the webpack.config.js
// configuration file as a base.
app.use(
  webpackDevMiddleware(compiler, {
    publicPath: webpackConfig.output.publicPath,
  })
)

routers.forEach(({ route, router }) => {
  app.use(route, router)
})

app.get('/test', async (req, res) => {
  const r = await pool.query('SELECT * FROM course;')
  console.log('r: ', r.rows)
  res.send(r.rows)
})

app.listen(port, () => {
  console.log(`Listening on port ${port}!`)
})
