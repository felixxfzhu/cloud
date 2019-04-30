const path = require('path');
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

console.log("base");
const webpackConfigBase = {
    entry:'./src/index.js',
    devServer:{
        contentBase:'./dist',
        port:8088
    },
    devtool: 'inline-source-map',
    output:{
        filename:'bundle.js',
        path:path.resolve(__dirname,'../dist')
    },
    plugins:[
        new HtmlWebpackPlugin({
            template:'./src/index.html'
        }),
        new CleanWebpackPlugin(['dist/bundle.js'])
    ],
    module:{
        rules:[
            {
                test:/\.(js|jsx)$/,
                exclude:/node_modules/,
                use:'babel-loader'
            },
            {
                test:/\.css$/,
                use:['style-loader','css-loader']
            },
            {
                test: /\.(eot|svg|ttf|woff)\??.*$/,
                loader: 'url-loader?name=fonts/[name].[hash:7].[ext]'
            }
        ]
    }   
};

module.exports = webpackConfigBase;