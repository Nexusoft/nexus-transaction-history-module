import path from 'path';
import svgToTinyDataUri from 'mini-svg-data-uri';
import { webpackAliases } from 'nexus-module';

export default {
  mode: process.env.NODE_ENV,
  devtool: 'source-map',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist/js'),
    filename: 'app.js',
  },
  target: 'web',
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
        // generator: {
        //   dataUrl: (content) => {
        //     console.log('|||', typeof content, content);
        //     content = content.toString();
        //     const id = RegExp(
        //       /id=((?<![\\])['"])((?:.(?!(?<![\\])\1))*.?)\1/gm
        //     ).exec(content)[2];
        //     const url = svgToTinyDataUri(content);
        //     console.log(url, id, '\n\n');
        //     return { url, id };
        //   },
        // },
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
  resolve: {
    alias: webpackAliases,
  },
  stats: {
    errorDetails: true,
  },
};
