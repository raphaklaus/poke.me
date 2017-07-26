const ExtractTextPlugin = require('extract-text-webpack-plugin'),
  path = require('path');

module.exports = {
  entry: {
    app: './pages/src/index.js',
    vendor: './pages/vendor/index.js'
  },
  output: {
    path: path.resolve(__dirname, 'pages/dist'),
    filename: '[name].js'
  },
  module: {
    rules: [{
      test: /\.css$/,
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: ['css-loader', 'postcss-loader']
      })
    },
    {
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader'
    },
    {
      test: /\.(woff|woff2|svg|eot|ttf)(\?.+)?$/i,
      loader: 'file-loader?name=[name].[ext]'
    }]
  },
  plugins: [
    new ExtractTextPlugin('bundle.css')
  ]
};
