'use strict';

let path = require('path');

module.exports = {
  mode: 'development',
  entry: './js/index.js',
  output: {
    filename: 'edit_course.js',
    //path: __dirname + '/dist/js'
    path: '/Users/Max/IdeaProjects/termon/src/main/resources/static/js/'
  },
  watch: true,

  devtool: "source-map",

  module: {}
};
