'use strict';

var path = require('path');
let ExtractTextPlugin = require('extract-text-webpack-plugin');


module.exports = {
	entry: [
		'./src/main/js/Main.js',
		'./src/main/js/RuleBox.scss',
	],
	output: {
		path: path.resolve(__dirname, './target/classes/static'),
		filename: 'bundle.js'
	},
	module: {
	  rules: [
		{
		  test: /\.js$/,
		  exclude: /(node_modules)/,
		  use: {
			loader: 'babel-loader',
			options: {
			  presets: ['react']
			}
		  },
		  
		}, 
		{
		  test: /\.scss$/,
		  loaders: ["style-loader","css-loader","sass-loader"]
		}
	  ]
	},
    resolve: {
        extensions: ['.js', '.jsx', '.scss']
	},
    plugins: [
        new ExtractTextPlugin('query-builder.css')
]	
};

