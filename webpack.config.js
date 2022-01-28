module.exports = {
  entry: './views/src/index.js',
  output: {
    path: __dirname,
    filename: './public/bundle.js'
  },
  resolve: {
    modules: [__dirname, 'node_modules'],
    extensions: ['*', '.js', '.jsx', '.json']
  },
  module: {
    rules: [
      {
        loader: 'babel-loader',
        options: {
          presets: ['react', 'es2015']
        },
        test: /\.js?$/,
        exclude: /(node_modules|bower_components)/
      },
      {
        test:/\.json$/,
        loader: 'json-loader'
      }
    ]
  }
};
