import type { Configuration } from 'webpack';
import path from 'path';

import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const config: Configuration = {
	entry: path.resolve(__dirname, 'src/index.tsx'),
	target: ['web', 'es2020'],
	mode: 'production',
	devtool: "source-map",
	module: {
	rules: [
		{
			test: /\.tsx?$/,
			use: [
				'ts-loader'
			],
			exclude: /node_modules/,
		},
		{
			test: /\.css$/,
			use: [
				'style-loader',
				'css-loader',
				{
					loader: 'postcss-loader',
					options: {
						postcssOptions: {
							plugins: [
							[
								"autoprefixer",
								{
								// Options
								},
							],
							],
						},
					}
				}
			]
		},
		{
			test: /\.s[ac]ss$/i,
			use: [
				'style-loader',
				'css-loader',
				{
					loader: 'postcss-loader',
					options: {
						postcssOptions: {
						plugins: [['autoprefixer', {}]],
						},
					},
				},
				'sass-loader',
			],
		},
	],
	},
	resolve: {
		extensions: ['.tsx', '.ts', '.js'],
	},

	output: {
		filename: '[name].js',
		path: path.resolve(__dirname, 'dist'),
		clean: true,
		library: {
			type: 'module',
		},
		auxiliaryComment: 'React Hoc Modal',
	},
	experiments: {
		outputModule: true,
	},
	externals: {
		react: 'react',
		'react-dom': 'react-dom',
	},
};

export default config;