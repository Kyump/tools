/*eslint-disable*/
const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const Dotenv = require('dotenv-webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const DotEnvConfig = new Dotenv({
	path: path.resolve(__dirname, '../../.env'),
});

const common = require('./webpack.base.config.js');

module.exports = merge(common, {
	devtool: 'inline-source-map',
	devServer: {
		disableHostCheck: true,
		inline: true,
		progress: true,
		clientLogLevel: 'info',
	},
	plugins: [
		DotEnvConfig,
		new CleanWebpackPlugin(),
		new webpack.NamedModulesPlugin(),
	],
});
