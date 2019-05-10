require('shelljs/global');
const path = require('path');
const webpack = require('webpack');
const config = require('./webpack.common.config');

/**
 * 静态资源预编译
 */

//所有静态资源
const vendors = [
	'react',
	'react-dom',
	'react-router-dom',
	'jquery',
	'antd-mobile',
	'fastclick',
	'video-react',
	'lodash'

];

//强制删除文件
rm('-rf', path.join('dist'));

module.exports = {
	output: {
		path: path.join(__dirname, "../dist"),
		filename: '[name].min.js',
		library: '[name]',
	},
	entry: {
		vendor: vendors,
	},
	plugins: [
		new webpack.DllPlugin({
			path: 'dist/manifest.min.json',
			name: '[name]',
			context: __dirname,
		}),
	],
};

