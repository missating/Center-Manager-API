const merge = require('webpack-merge');
const uglifyJsPlugin = require('uglifyjs-webpack-plugin');
const optimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const config = require('./webpack.config.js');
const { miniCssExtract } = require('./webpack.plugins');

module.exports = merge(config, {
  output: {
    filename: '[name].min.js'
  },
  devtool: 'source-map',
  optimization: {
    minimizer: [
      new uglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: true
      }),
      new optimizeCSSAssetsPlugin({})
    ]
  },
  plugins: [miniCssExtract]
});
