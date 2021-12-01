import path from 'path';
import baseConfig from './webpack.config.babel';

const port = 24011;
const publicPath = `http://localhost:${port}/`;

const config = {
  ...baseConfig,
  devtool: 'eval-source-map',
  devServer: {
    port,
    hot: true,
    compress: true,
    historyApiFallback: true,
    headers: { 'Access-Control-Allow-Origin': '*' },
    static: path.join(process.cwd(), 'dist'),
  },
};

export default config;
