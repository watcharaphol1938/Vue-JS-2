const webpack = require('webpack');

module.exports = {
  devServer: {
    disableHostCheck: true,
    host: 'localhost',
    port: '8080',
    proxy: {
      '^/common-backend/*': {
        target: 'http://localhost:8000',
      },
      '^/asia-oee/*': {
        target: 'http://localhost:5000',
      },
      '^/samlsp/*': {
        target: 'http://localhost:8887',
      },
    },
  },
  publicPath: process.env.NODE_ENV === 'production' ? './static/' : '/',
  configureWebpack: {
    plugins: [
      new webpack.DefinePlugin({
        // ビルド時の環境変数でmswの利用有無を切り替えるための設定.
        USE_MSW: JSON.stringify(process.env.USE_MSW),
      }),
    ],
  },
};
