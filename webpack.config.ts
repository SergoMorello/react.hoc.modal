import type { Configuration } from 'webpack';
import path from 'path';

const config: Configuration = {
  entry: {
	index: path.resolve(__dirname, 'src/index.tsx')
  },
  target: 'web',
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
	  { test: /\.css$/, use: [
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
		] }
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
		name: 'Modal',
		type: 'umd',
		// export: 'default'
	},
	globalObject: 'this',
	libraryTarget: 'umd',
	auxiliaryComment: 'React Hoc Modal',
  },
  externals: {
    react: {
       root: 'react',
       commonjs: 'react',
       commonjs2: 'react',
       amd: 'react',
    },
	'react-dom': {
       root: 'react-dom',
       commonjs: 'react-dom',
       commonjs2: 'react-dom',
       amd: 'react-dom',
    }
  }
};

export default config;