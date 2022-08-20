const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const webpack = require('webpack');
const path = require('path');
const webpackDevMiddleware = require('webpack-dev-middleware');
const { pool } = require('../../db/connect.js');

const app = express();
const configPath = path.resolve('webpack.config.js');
const webpackConfig = require(configPath);
const compiler = webpack(webpackConfig);

const port = 3000;

// Tell express to use the webpack-dev-middleware and use the webpack.config.js
// configuration file as a base.
app.use(
  webpackDevMiddleware(compiler, {
    publicPath: webpackConfig.output.publicPath,
  })
);

app.get('/test', async (req, res) => {
  const r = await pool.query('SELECT * FROM course;');
  console.log('r: ', r.rows);
  res.send(r.rows);
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});
