const gulp = require('gulp');
const rename = require('gulp-rename');
const server = require('./server.js');
const argv = require('yargs').argv;
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const path = require('path');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

var plugins = {
    production: [
        new webpack.LoaderOptionsPlugin({
            minimize: true
        }),
        new UglifyJSPlugin
    ],
    development: [

    ]
}

var coffeePath = '../assets/coffee/';

var env = argv.dev ? 'development' : 'production';

var webpackCommonConfig = {
    resolve: {
        extensions: ['.coffee', '.vue', '.js'],
        modules: [
            'assets/coffee',
            'node_modules',
        ]
    },
    plugins: plugins[env],
    mode: env,
    module: {
        rules: [
            {
                test: /\.coffee$/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['env']
                        }
                    },
                    'coffee-loader'
                ]
            },
            {
                test: /\.vue$/, loader: 'vue-loader',
                options: {
                    postcss: [autoprefixer()]
                }
            }
        ]
    },
    devtool: argv.dev ? 'cheap-inline-source-map' : false,
    optimization: {
        splitChunks: {
            cacheGroups: {
                commons: {
                    test: /[\\/]node_modules[\\/]/,
                    name: "common",
                    chunks: "all"
                }
            }
        }
    }
};

var webpackCallback = function(err, stats) {
    console.log(stats.toString({
        colors: true,
        modules: false
    }));

    server.reload();
};

gulp.task('coffee', function(){
    webpack(
        Object.assign(webpackCommonConfig, {
            entry: {
                'index': 'Index'
            },
            output: {
                filename: '[name].js',
                path: path.resolve(__dirname, '../public/js')
            },
        })
    , webpackCallback);
});
