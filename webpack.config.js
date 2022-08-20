import path from 'path'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import Dotenv from 'dotenv-webpack'

const config = {
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './public',
  },
  mode: 'development',
  module: {
    rules: [
      { test: /\.m?js/, resolve: { fullySpecified: false } },
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env', 
              '@babel/preset-react', 
            ]
          }
        }
      }
    ]
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(path.dirname('./'), 'public'),
    clean: true,
    publicPath: '/',
  },
  watchOptions: {
    aggregateTimeout: 200,
    ignored: '**/node_modules/**',
    poll: 1000,
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Basic Express React App',
      templateContent: "<div id='reactApp'></div>"
    }),
    new Dotenv(),
  ],
  resolve: {
    alias: {
      components: path.resolve(path.dirname('./'), './src/components'),
    },
  },
}

export default config;
