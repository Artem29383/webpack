const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ErrorOverlayPlugin = require('error-overlay-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const isDev = process.env.NODE_ENV === 'development';
const isProd = !isDev;

const optimize = () => {
  const config = {
    splitChunks: {
      chunks: 'all'
    }
  };
  return config;
};

const filename = ext => isDev ? `[name].${ext}` : `[name].[hash].${ext}`;

const babelOptions = preset => {
  const options = {
    presets: [
      '@babel/preset-env'
    ]
  };
  
  if (preset) options.presets.push(preset);
  
  return options
};

const jsLoaders = (react) => {
  const loaders = [{
    loader: 'babel-loader',
    options: babelOptions(react)
  }];
  
  if (isDev) loaders.push('eslint-loader', 'stylelint-custom-processor-loader');
  
  return loaders;
};

const plugins = () => {
  const base = [
    new HTMLWebpackPlugin({
      template: './index.html',
      minify: {
        collapseWhitespace: isProd
      }
    }),
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin([{
      from: path.resolve(__dirname, 'src/favicon.ico'),
      to: path.resolve(__dirname, 'dist')
    }])
  ];
  
  if (isDev) base.push(new ErrorOverlayPlugin());
  if (isProd) base.push(new BundleAnalyzerPlugin());
  
  return base;
};

module.exports = {
  context: path.resolve(__dirname, 'src'),
  mode: 'development',
  entry: {
    main: ['@babel/polyfill', './index.js'],
  },
  output: {
    filename: filename('js'),
    path: path.resolve(__dirname, 'dist')
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  optimization: optimize(),
  devServer: {
    port: 3000,
    hot: isDev,
    overlay: true
  },
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000
  },
  devtool: isDev ? 'source-map' : '',
  plugins: plugins(),
  module: {
    rules: [
      {
        test: /\.(svg|png|jpg|jpeg|gif)$/,
        use: ['file-loader']
      },
      {
        test: /\.(otf|ttf|woff|woff2|eot)$/,
        use: ['file-loader']
      },
      {
        test: /\.(jsx?)$/,
        exclude: /node_modules/,
        use: jsLoaders('@babel/preset-react')
      }
    ]
  }
};


