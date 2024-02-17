const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    docs: path.resolve(__dirname, 'src/docs/index.tsx'),
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    // libraryTarget: 'commonjs2',
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.mdx$/,
        use: [
          {
            loader: '@mdx-js/loader',
            /** @type {import('@mdx-js/loader').Options} */
            options: {},
          },
        ],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: './src/docs/index.html',
      filename: 'index.html',
    }),
  ],
  devServer: {
    hot: true,
    port: 9000,
    historyApiFallback: true,
  },
};
