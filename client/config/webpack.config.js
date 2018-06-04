const path = require('path');
const {
  cleanWebpack,
  definePlugin,
  htmlWebpack,
  miniCssExtract
} = require('./webpack.plugins');

const isDevMode = process.env.NODE_ENV !== 'production';

module.exports = {
  entry: {
    bundle: path.join(__dirname, '..', 'src', 'index.tsx')
  },
  output: {
    path: path.join(__dirname, '..', 'dist'),
    filename: '[name].js',
    publicPath: '/'
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    alias: {
      pages: path.resolve(__dirname, '..', 'src/pages/'),
      components: path.resolve(__dirname, '..', 'src/components/')
    },
    modules: [path.resolve(__dirname, 'src'), 'node_modules']
  },
  module: {
    rules: [
      {
        test: /\.(woff(2)?|ttf|eot|svg|png|jpg|jpeg|gif)$/,
        use: {
          loader: 'file-loader'
        }
      },
      {
        test: /\.scss$/,
        use: [
          isDevMode ? 'style-loader' : miniCssExtract.loader,
          {
            loader: 'css-loader',
            options: {
              sourceMap: true
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true
            }
          }
        ]
      },
      {
        test: /\.tsx?$/,
        use: {
          loader: 'awesome-typescript-loader'
        }
      }
    ]
  },
  plugins: [htmlWebpack, cleanWebpack, definePlugin, miniCssExtract]
};
