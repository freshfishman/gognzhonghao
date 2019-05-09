const path = require('path');
const webpack = require('webpack');
const config = require('./webpack.common.config');
const port = 8000;

config.devServer = {
	contentBase: path.join(__dirname, "dist"),
	compress: true,
	port: port,
	host: '192.168.124.24'		//可选,不定义是为localhost, 定义是为当前ip
	//host:'192.168.0.107'
};

config.plugins.push(new webpack.HotModuleReplacementPlugin());

module.exports = config;