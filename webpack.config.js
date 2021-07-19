var path = require('path')
var webpack = require('webpack')

module.exports = {
 entry: './src/index.js',
 mode: 'production',
 target: ['web', 'es5'],
 output: {
   path: path.resolve(__dirname, 'dist'),
   filename: 'historypp.js',
   libraryTarget: 'umd',
 },
 module: {
   rules: [
     { test: /\.js/, use: 'babel-loader' },
   ]
 },
 stats: {
     colors: true
 },
}
