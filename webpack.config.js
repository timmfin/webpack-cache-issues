var path = require('path');
var webpack = require('webpack');

module.exports = {
    entry: {
        'main': './es6/main.js',
        'other': './es6/other-small-thing.js',
    },
    output: {
        path: __dirname,
        filename: '[name]-bundle.js'
    },
    module: {
        loaders: [
            {
                loader: 'babel-loader',
                test: path.join(__dirname, 'es6'),
                query: {
                  presets: 'es2015',
                },
            }
        ]
    },
    // stats: {
    //     // Nice colored output
    //     colors: false,
    //     cached: true,
    //     timings: true
    // },
    resolve: {
      extensions: ['', '.js']
    },
    cache: true

    // Create Sourcemaps for the bundle
    // devtool: 'source-map',
};
