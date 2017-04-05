var pathmap = require('./pathmap.js'),
    webpack = require('webpack'),
    ExtractTextPlugin = require('extract-text-webpack-plugin'),
    CopyWebpackPlugin = require('copy-webpack-plugin'),
    argv = require('yargs').argv;

var rootDir = pathmap.root,
    buildDir = pathmap.build,
    production = !!argv.production;

var config = {
    resolve: {
        root: rootDir,
        moduleDirectories: ['app', 'assets', 'node_modules'],
        alias: {
            'ui.router': 'angular-ui-router/release/angular-ui-router',
            'app.config': 'app/global/config.js'
        }
    },
    entry: {
        utils: [
            'underscore',
            'split.js'
        ],
        angular: [
            'angular',
            'ui.router',
            'angular-bootstrap',
            'oclazyload'
        ],
        app: [
            'app.module.js'
        ]
    },
    output: {
        path: buildDir,
        publicPath: '',
        filename: '[name].js'
    },
    module: {
        loaders: [{
            test: /\.js$/,
            loader: 'babel',
            exclude: [/node_modules/, /bower_components/, /datagrid/]
        },{
            test: /\.css$/,
            loader: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: 'css-loader' + (production && '?minimize' || '')
            }),
            exclude: [/node_modules/]
        },{
            test: /\.less$/,
            loader: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: 'css-loader' + (production && '?minimize' || '') + '!less-loader'
            }),
            exclude: /node_modules/
        },{
            test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
            loader:  'url-loader?limit=10000&mimetype=application/font-woff',
            exclude: /node_modules/
        },{
            test: /\.(ttf|eot|svg|gif)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
            loader: 'file-loader',
            exclude: /node_modules/
        },{
            test: /\.(png|jpg)$/,
            loader: 'url?limit=25000',
            exclude: /node_modules/
        },{
            test: /\.html$/,
            loader: 'raw' + (production && '!html-minify' || ''),
            exclude: /node_modules/
        }
        ]
    },
    'html-minify-loader': {
        empty: true,
        cdata: true,
        comments: false,
        ssi: true,
        conditionals: true,
        spare: true,
        quotes: true,
        loose: true,
        dom: {
            xmlMode: false,
            lowerCaseAttributeNames: true,
            lowerCaseTags: true
        }
    },
    plugins: [
        new webpack.optimize.DedupePlugin(),
        new ExtractTextPlugin('styles.css'),
        new CopyWebpackPlugin([
            {from: pathmap.static.assets},
            {from: pathmap.static.index}
        ]),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'utils',
            filename: 'utils.js',
            minChunks: Infinity
        })
    ]
};

module.exports = config;