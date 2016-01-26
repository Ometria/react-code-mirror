var path 	= require('path'),
	webpack = require('webpack')

module.exports = {
	entry: {
		app: ['./src/index.jsx']
	},

	output: {
		path: path.resolve(__dirname, 'lib'),
		publicPath: '/',
		filename: 'index.js',
			library: 'ReactCodeMirror',
			libraryTarget: 'umd'
	},
	module: {
		loaders: [
			// Babel loader
			{
				test: /\.jsx?$/,
				exclude: /(node_modules|bower_components)/,
				loader: 'babel',
				query: {
					presets: ['es2015', 'react', 'stage-2'] // Make babel 6 work with React, ES6, ES7
				}
			}
		]
	},

	externals: {
		react: 'React'
		// codemirror: 'codemirror'
	},

	resolve: {
		modulesDirectories: [
			'node_modules',
			'src'
		],

		extensions: ['.js', '.json', '.jsx', '']
	}
}