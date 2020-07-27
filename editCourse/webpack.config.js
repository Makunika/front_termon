'use strict';

let path = require('path');

module.exports = {
  mode: 'development',
  entry: './js/index.js',
  output: {
    filename: 'edit_course.js',
    path: __dirname + '/dist/js'
  },
  watch: true,

  devtool: "source-map",

  module: {}
};
