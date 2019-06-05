/*eslint-disable*/

const path = require('path');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const CleanWebpackPluginConfig = new CleanWebpackPlugin();

const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
	template: './src/index.html',
	filename: 'index.html',
});

const config = {
	mode: 'development',
	context: path.resolve(__dirname),
	optimization: {
		splitChunks: {
			cacheGroups: {
				commons: {
					test: /[\\/]node_modules[\\/]/,
					name: 'vendor',
					chunks: 'initial',
				},
			},
		},
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						babelrc: false,
						presets: [
							'@babel/preset-react',
							'@babel/preset-flow',
							[
								'@babel/preset-env',
								{
									targets: {
										chrome: '58',
										ie: '11',
									},
								},
							],
						],
						plugins: [
							'@babel/plugin-transform-runtime',
							// Stage 0
							'@babel/plugin-proposal-function-bind',
							// Stage 1
							'@babel/plugin-proposal-export-default-from',
							'@babel/plugin-proposal-logical-assignment-operators',
							[
								'@babel/plugin-proposal-optional-chaining',
								{
									loose: false,
								},
							],
							[
								'@babel/plugin-proposal-pipeline-operator',
								{
									proposal: 'minimal',
								},
							],
							[
								'@babel/plugin-proposal-nullish-coalescing-operator',
								{
									loose: false,
								},
							],
							'@babel/plugin-proposal-do-expressions',
							// Stage 2
							[
								'@babel/plugin-proposal-decorators',
								{
									legacy: true,
								},
							],
							'@babel/plugin-proposal-function-sent',
							'@babel/plugin-proposal-export-namespace-from',
							'@babel/plugin-proposal-numeric-separator',
							'@babel/plugin-proposal-throw-expressions',
							// Stage 3
							'@babel/plugin-syntax-dynamic-import',
							'@babel/plugin-syntax-import-meta',
							[
								'@babel/plugin-proposal-class-properties',
								{
									loose: false,
								},
							],
							'@babel/plugin-proposal-json-strings',
						],
					},
				},
			},
			{
				test: /\.mjs$/,
				include: /node_modules/,
				type: 'javascript/auto',
			},
			{
				test: /\.css$/,
				loader: 'style-loader!css-loader',
			},
		],
	},
	resolve: {
		alias: {
			react: path.resolve('./packages/final-form-generator-mui-example/node_modules/react'),
			'react-dom': path.resolve('./packages/final-form-generator-mui-example/node_modules/react-dom'),
			'@material-ui': path.resolve('./packages/final-form-generator-mui-example/node_modules/@material-ui'),
		},
	},
	plugins: [CleanWebpackPluginConfig, HtmlWebpackPluginConfig],
	output: {
		filename: '[name].[hash].js',
		path: path.resolve(__dirname, 'dist'),
	},
};

module.exports = config;
