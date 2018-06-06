const merge = require('webpack-merge');
const config = require('./webpack.config.js');
const path = require('path');
const {
  namedModulesPlugin,
  hotModuleReplacementPlugin
} = require('./webpack.plugins');

module.exports = merge(config, {
  output: {
    filename: '[name].js'
  },
  devServer: {
    historyApiFallback: true,
    contentBase: path.resolve(__dirname, '../src/assets'),
    publicPath: 'http://localhost:7000/',
    hot: true,
    overlay: true,
    port: 7000,
    host: 'localhost',
    open: true,
    watchContentBase: true,
    watchOptions: {
      poll: true,
      ignored: /node_modules/
    }
  },
  plugins: [namedModulesPlugin, hotModuleReplacementPlugin]
});
