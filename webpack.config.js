const path = require("path")
const webpack = require("webpack")
const HtmlWebpackPlugin = require('html-webpack-plugin')
require("babel-polyfill")


module.exports = (env, argv) => {

  var defineHash = {}

  var keys = ['api_url', 'api_user', 'api_password', 'auto_publish', 'allow_republish']

  keys.forEach(key => {
    if (argv[key]) {
      defineHash[key.toUpperCase()] = `'${argv[key]}'`
    } else if (key === 'auto_publish') {
      defineHash[key.toUpperCase()] = `true`
    } else if (key === 'allow_republish') {
      defineHash[key.toUpperCase()] = `true`
    }
  })

  return {
    devtool: 'source-map',
    entry: ['babel-polyfill', 'react-hot-loader/patch', './src/index.js'],
    mode: "development",
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /(node_modules|bower_components)/,
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"]
          }
        }
      ]
    },
    resolve: {
      alias: {
        'react-dom': '@hot-loader/react-dom',
      },
    },
    output: {
      path: path.resolve(__dirname, "dist/"),
      publicPath: "/dist/",
      filename: "bundle.js"
    },
    devServer: {
      contentBase: path.join(__dirname, "public/"),
      port: 3000,
      publicPath: "http://localhost:3000/dist/",
      hot: true,
      quiet: true,
      disableHostCheck: true,
      historyApiFallback: true,
      openPage: '/'
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new webpack.DefinePlugin(defineHash),
      new HtmlWebpackPlugin({
        title: 'Hot Module Replacement',
      })
    ]
  }
}
