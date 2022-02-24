import path from 'path';
import svgToTinyDataUri from 'mini-svg-data-uri';

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
      'react-dom': path.resolve(__dirname, 'src/reactDom.js'),
    },
  },
  module: {
    rules: [
      {
        test: /\.svg$/,
        type: 'asset/inline',
        use: {
          loader: 'svgo-loader',
          options: {
            configFile: false,
            plugins: [
              { name: 'cleanupAttrs' },
              { name: 'cleanupEnableBackground' },
              {
                name: 'removeAttrs',
                params: {
                  attrs: ['fill', 'height', 'width'],
                },
              },
            ],
          },
        },
        generator: {
          dataUrl: (content) => {
            content = content.toString();
            const id = RegExp(
              /id=((?<![\\])['"])((?:.(?!(?<![\\])\1))*.?)\1/gm
            ).exec(content)[2];
            const url = svgToTinyDataUri(content);
            return { url, id };
          },
        },
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
