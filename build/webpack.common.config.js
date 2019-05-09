/**
 * Created by tonghao on 2019/2/28.
 */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');	//抽离css样式,防止将样式打包在js中引起页面样式加载错乱的现象

module.exports = {
	entry: {
		app: "./index.js"
	},
	output: {
		filename: "[name].js",
		path: path.resolve(__dirname, '../dist')
	},
	resolve: {
		extensions: [".jsx", ".js", ".json"]
	},
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				loader: "babel-loader",
				exclude: /node_modules/
			},
			{
				test: /\.less$/,
				loader: ExtractTextPlugin.extract({
					fallback: 'style-loader',	//编译后用什么loader来提取css文件
					use: 'css-loader!less-loader'
				})
			},
			{
				test: /\.css$/,
				loader: ExtractTextPlugin.extract({
					fallback: 'style-loader',
					use: 'css-loader'
				})
			},
			{
				test: /\.(jpg|png|jpeg|gif|eot|ttf|woff|svg)$/,
				loader: 'url-loader?limit=8192&name=images/[hash:8].[name].[ext]',
				options:{
					publicPath:'./images'
				}
			}

		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			filename: 'index.html',
			template: 'index.html',
			inject: true,
			minify: {
				removeComments: true,  //移除HTML中的注释
				collapseWhitespace: true, //删除空白符与换行符
				removeAttributeQuotes: true  //删除属性引用
			},
		}),
		new ExtractTextPlugin({
			filename: 'css/[name].css'
		}),
	],
};
