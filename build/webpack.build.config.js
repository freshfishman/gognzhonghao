const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');	//抽离css样式,防止将样式打包在js中引起页面样式加载错乱的现象
const config = require('./webpack.common.config');

config.output = {
	path: path.resolve(__dirname, '../dist'),
	filename: '[name].[hash:7].js'
};

config.plugins = [
	new webpack.DllReferencePlugin({
		context: __dirname,
		manifest: require('../dist/manifest.min.json'),
	}),
	new HtmlWebpackPlugin({
		filename: 'index.html',
		template: 'index.html',
		inject: true,  //插入位置
		minify: {
			removeComments: true,  //移除HTML中的注释
			collapseWhitespace: true, //删除空白符与换行符
			removeAttributeQuotes: true  //删除属性引用
		},
	}),
	new ExtractTextPlugin({
		filename: 'css/[name].[hash:7].css'
	}),
	//打包压缩
	new webpack.optimize.UglifyJsPlugin({
		compress: {
			warnings: false  //是否显示打包详情
		}
	})
]

module.exports = config;