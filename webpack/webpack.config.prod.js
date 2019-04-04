const path = require('path');
const webpack = require('webpack');
const host = (process.env.HOST || 'localhost');
const port = (process.env.PORT || 3100);
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
// let host = (process.env.HOST || 'localhost');
// let port = (+process.env.PORT + 1) || 3001;

const processCWD = process.cwd();

const publicPath = '/';
const srcPath = (...paths) =>
  path.resolve(...[processCWD, 'src', ...paths].filter(e => !!e));
const destPath = (...paths) =>
  path.resolve(...[processCWD, 'dist', ...paths].filter(e => !!e));
const resourcesPath = (...paths) =>
  path.resolve(...[processCWD, 'public', ...paths].filter(e => !!e));

module.exports = {
  // Content
  entry: './src/client.js',
  // A SourceMap without column-mappings ignoring loaded Source Maps.
  devtool: 'cheap-module-source-map',
  plugins: [
    // simplifies creation of HTML files to serve your webpack bundles.
    // This is especially useful for webpack bundles that include a hash in the filename
    // which changes every compilation. You can either let the plugin generate an HTML file for you,
    // supply your own template using lodash templates or use your own loader.
    new HtmlWebpackPlugin({
      title: 'React',
      template: 'src/index.html'
    }),
    // Auto replacement of page when i save some file, even css
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      'process.env.API': JSON.stringify(process.env.API),
      'process.env.PORT': JSON.stringify(process.env.PORT),
      'process.env.APIHOST': JSON.stringify(process.env.APIHOST),
      'process.env.APIPORT': JSON.stringify(process.env.APIPORT),
      __CLIENT__: true,
      __SERVER__: false,
      __DEVELOPMENT__: false,
      __DEVTOOLS__: false  // <-------- DISABLE redux-devtools HERE
    }),
    new CopyWebpackPlugin([{
      from: 'public',
      to: 'public'
    }])
  ],
  output: {
    path: destPath(),
    filename: '[name].bundle.js',
    publicPath: publicPath,
    sourceMapFilename: '[name].map',
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /node_modules/,
          chunks: 'initial',
          name: 'vendor',
          enforce: true
        },
      }
    }
  },
  resolve: {
    extensions: ['.json', '.js', '.jsx'],
    modules: [
      srcPath(),
      'node_modules',
      resourcesPath()
    ]
  },
  devServer: {
    port: port,
    host: host,
    // Be possible go back pressing the 'back' button at chrome
    historyApiFallback: true,
    noInfo: false,
    stats: 'minimal',
    publicPath: publicPath,
    contentBase: [path.resolve(processCWD, 'dist'), path.resolve(processCWD, 'src')],
    // hotmodulereplacementeplugin
    hot: true
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'resolve-url-loader', 'css-loader'],
        include: /flexboxgrid/
        // Follow instructions at https://github.com/roylee0704/react-flexbox-grid
      },
      // {
      //   test: /\.json$/,
      //   loader: 'json-loader'
      // },
      {
        test: /\.scss$/,
        use: [
          'style-loader', // creates style nodes from JS strings
          'css-loader', // translates CSS into CommonJS
          'resolve-url-loader',
          'sass-loader' // compiles Sass to CSS, using Node Sass by default
        ]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: ['file-loader']
      },
      {
        test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/, 
        loader: 'file-loader'
      },
      {
        test: /\.js|.jsx?$/,
        exclude: /(node_modules)/,
        loaders: ['babel-loader']
      },
      {
        test: /bootstrap-sass[\/\\]assets[\/\\]javascripts[\/\\]/,
        loader: 'imports-loader?jQuery=jquery'
      }
    ]
  },
};
