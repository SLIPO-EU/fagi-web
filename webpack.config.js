'use strict';

var path = require('path');

module.exports = {
	entry: [
		'./src/main/js/Main.js',
		'./src/main/scss/style.scss',
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
			  presets: ['env','react','stage-0']
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
	}
};
