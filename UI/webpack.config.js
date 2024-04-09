const path = require('path');
const HtmlWebPackPlugin = require("html-webpack-plugin");


module.exports = {
  mode: 'development',
  entry:  { app: './src/App.js' },
  output: {
    filename: '[name].bundle.js', 
    path: path.resolve(__dirname, 'public'),
  },
  module: {
    rules: [
      {
        test: /\.(jpe?g|png|gif|svg|ico)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'img/'
            }
          }
        ]
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', {
                targets: {
                  ie: '11',
                  edge: '15',
                  safari: '10',
                  firefox: '50',
                  chrome: '49',
                },
              }],
              '@babel/preset-react',
            ],
          },
        },
      },
    ],
  },
  optimization: {
    splitChunks: { name: 'vendor', chunks: 'all', },
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: './public/index.html'
    })
  ],
  devtool: 'source-map',
  resolve: {
    extensions: ['.js', '.jsx'], 
  }
};