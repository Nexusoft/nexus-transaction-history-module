import path from 'path';

export default {
  mode: process.env.NODE_ENV,
  devtool: 'source-map',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist/js'),
    filename: 'app.js',
  },
  target: 'web',
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
    modules: [path.join(process.cwd(), 'src/shared'), 'node_modules'],
    alias: {
      // because victory library requires react
      react$: path.resolve(__dirname, 'src/react.js'),
    },
  },
  module: {
    rules: [
      {
        test: /\.svg$/,
        use: [
          {
            loader: 'file-loader',
          },
          {
            loader: 'svgo-loader',
          },
        ],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
          },
        },
      },
    ],
  },
};
