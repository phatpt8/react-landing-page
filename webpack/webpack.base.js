const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

function getEntries(entries) {
    if (process.env.NODE_ENV === 'development') {
        return entries.concat([
            'webpack-dev-server/client?http://localhost:8080',
            'webpack/hot/only-dev-server']
        )
    }
    return entries;
}

const env = process.env.NODE_ENV || 'development';
const publicPath = process.env.PUBLIC_PATH || "/";
const isDev = env !== "production";
const buildPath = path.resolve('build');
const sourcePath = path.resolve('src');
const indexPath = sourcePath + "/index";

module.exports = {
    entry: isDev ? getEntries([indexPath]) : indexPath,
    output: {
        path: buildPath,
        filename: 'j.[hash].js',
        publicPath: publicPath
    },
    resolve: {
        modules: [
            './src',
            'node_modules',
        ],
        alias: {
            $src: sourcePath,
            $components: sourcePath + '/components',
            $actions: sourcePath + '/actions',
            $public: sourcePath + '/public',
            $api: sourcePath + '/api',
        },
        extensions: ['.js', '.jsx', '.css', '.sass', '.svg', '.html', '.ico']
    },
    devtool: isDev ? 'eval-source-map' : 'source-map',
    module: {
        rules: [{
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: [{
                loader: 'babel-loader',
                options: {
                    presets: ['env', 'stage-0', 'react'],
                    plugins: ['transform-runtime']
                }
            }]
        }, {
            test: /\.(scss|css)$/,
            use: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: [
                  {
                    loader: 'css-loader',
                    options: {
                      sourceMap: isDev
                    }
                  },
                  {
                    loader: 'postcss-loader',
                    options: {
                      sourceMap: true,
                      plugins: () => [autoprefixer]
                    }
                  },
                  {
                    loader: 'sass-loader',
                    options: {
                      sourceMap: true
                    }
                  }
                ]
            })
        }, {
            test: /\.(jpg|png)$/,
            loader: 'file-loader',
            options: {
              name: 'images/[name].[ext]'
            },  
        }
      ]
    },
    plugins: prodPlugins([
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify(env)
            }
        }),
        new HtmlWebpackPlugin({
            template: './src/index.ejs',
            filename: './index.html'
        }),
        new ExtractTextPlugin('c.[contenthash].css')
    ])
};

function prodPlugins(commonPlugins) {
    return isDev ? commonPlugins : commonPlugins.concat([
        new webpack.optimize.UglifyJsPlugin(),
        new webpack.optimize.AggressiveMergingPlugin(),
        new webpack.NoEmitOnErrorsPlugin()
    ])
}