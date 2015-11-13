module.exports = function (config) {
  config.set({
    browsers: [ 'PhantomJS' ], //run in Chrome
    frameworks: [ 'mocha', 'sinon-chai' ], //use the mocha test framework
    junitReporter: {
        outputDir: process.env.CIRCLE_TEST_REPORTS || './'
    },
    files: [
      'node_modules/babel-es6-polyfill/browser-polyfill.min.js',
      './test/webpack.entry.js' //just load this file
    ],
    preprocessors: {
      './test/webpack.entry.js': [ 'webpack', 'sourcemap' ] //preprocess with webpack and our sourcemap loader
    },
    reporters: ['mocha', 'junit'], //report results in this format
    webpack: { //kind of a copy of your webpack config
      devtool: 'inline-source-map', //just do inline source maps instead of the default
      module: {
        loaders: [
          { test: /\.js$/, loader: 'babel-loader' }
        ]
      }
    },
    webpackServer: {
      noInfo: true //please don't spam the console when running in karma!
    }
  });
};
