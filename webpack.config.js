const path = require('path')

module.exports = {
  mode: 'development', // Use 'production' for production builds
  entry: './script.js', // Entry point of your application
  output: {
    path: path.resolve(__dirname, 'public/dist'), // Output directory
    filename: 'bundle.js', // Output file name
  },
  module: {
    rules: [
      {
        test: /\.js$/, // Transpile all .js files
        exclude: /node_modules/, // Except for node_modules
        use: {
          loader: 'babel-loader', // Use Babel loader
          options: {
            presets: ['@babel/preset-env'], // Preset for compiling ES6
          },
        },
      },
    ],
  },
  externals: {
    fs: 'null',
    readline: 'null',
  },
  devServer: {
    contentBase: './public/dist',
    hot: true,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname),
    },
    extensions: ['.js', '.json'],
  },
  stats: {
    errorDetails: true,
  },
}
