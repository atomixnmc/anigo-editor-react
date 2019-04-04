const path = require('path');
const webpack = require('webpack');
const host = (process.env.HOST || 'localhost');
const port = (process.env.PORT || 3100);
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// let host = (process.env.HOST || 'localhost');
// let port = (+process.env.PORT + 1) || 3001;
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');
const MONACO_DIR = path.resolve(__dirname, './node_modules/monaco-editor');
const processCWD = process.cwd();

const publicPath = '/';
const srcPath = (...paths) =>
  path.resolve(...[processCWD, 'src', ...paths].filter(e => !!e));
const destPath = (...paths) =>
  path.resolve(...[processCWD, 'dist', ...paths].filter(e => !!e));
const resourcesPath = (...paths) =>
  path.resolve(...[processCWD, 'public', ...paths].filter(e => !!e));

// const bootloaderConfigPath = path.resolve('./.bootstraprc');
// console.log('bootloaderConfigPath', bootloaderConfigPath);
module.exports = {
  // Content
  entry: [
    // `bootstrap-loader/lib/bootstrap.loader?extractStyles&configFilePath=${bootloaderConfigPath}!bootstrap-loader/no-op.js`,
    './src/client.js'],
  // A SourceMap without column-mappings ignoring loaded Source Maps.
  // devtool: 'cheap-module-source-map',
  devtool: 'cheap-eval-source-map',
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
      __DEVELOPMENT__: true,
      __DEVTOOLS__: true  // <-------- DISABLE redux-devtools HERE
    }),
    new webpack.ProvidePlugin({
      'window.Tether': 'tether',
      React: 'react',
      ReactDOM: 'react-dom',
      $: 'jquery',
      jQuery: 'jquery'
    }),
    new MonacoWebpackPlugin({
      // available options are documented at https://github.com/Microsoft/monaco-editor-webpack-plugin#options
      languages: ['json']
    }),
    new MiniCssExtractPlugin(),
    new CopyWebpackPlugin([{
      from: 'public',
      to: 'public'
    }])
  ],
  output: {
    path: path.join(__dirname, publicPath),
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
      {
        test: /\.css$/,
        include: /node_modules/,
        loaders: ['style-loader', 'css-loader'],
      }, {
        test: /\.css$/,
        include: MONACO_DIR,
        use: ['style-loader', 'css-loader'],
      },
      // {
      //   test: /\.json$/,
      //   loader: 'json-loader'
      // },
      {
        test: /\.scss$/,
        use: [
          // 'style-loader', // creates style nodes from JS strings{
          {
            loader: MiniCssExtractPlugin.loader
          },
          'css-loader', // translates CSS into CommonJS
          'resolve-url-loader',
          'postcss-loader',
          { loader: 'sass-loader',
            options: {
              sourceMap: true
            }
          }// compiles Sass to CSS, using Node Sass by default
        ]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: ['file-loader']
      },
      {
        test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
        use: ['file-loader']
      },
      {
        test: /\.js|.jsx?$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        }
      },
      // {
      //   test: /bootstrap-sass[\/\\]assets[\/\\]javascripts[\/\\]/,
      //   loader: 'imports-loader?jQuery=jquery'
      // }
      // Bootstrap 4
      {
        test: /bootstrap[\/\\]dist[\/\\]js[\/\\]umd[\/\\]/,
        loader: 'imports-loader?jQuery=jquery'
      },
    ]
  },
  // Ugly fix for 'fs' not found
  node: {
    fs: 'empty'
  },
};
