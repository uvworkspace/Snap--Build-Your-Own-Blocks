
const path = require('path');
const webpack = require('webpack');
const ConcatPlugin = require('webpack-concat-plugin');

module.exports = (env = {}, argv) => {
  let isDev = argv.mode !== 'production';
  let hash = isDev ? 'bundle' : '[hash:8]';
  return {
    entry: {
      'uvw-snap': ['./client.js'],
    },
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: `[name].${hash}.js`,
    },

    //devtool: 'source-map',

    module: {
      rules: [{
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: { limit: 10000, name: 'img/[name].[hash:7].[ext]' }
      }]
    },

    plugins:[
      new ConcatPlugin({
          uglify: !isDev,
          sourceMap: false,
          name: 'snap',
          //outputPath: 'dist/',
          fileName: isDev ? '[name].bundle.js' : '[name].[hash:8].js',
          filesToConcat: ['../morphic.js'],
          attributes: {
              async: true
          }
      })
    ]
  };
};

