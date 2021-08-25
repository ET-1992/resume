/* webpack.config.js
 * @ Cong Min
 */
// const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
    entry: {
        app: ['./src/entry.js']
    },
    output: {
        filename: 'static/[name].js?[hash:6]',
        path: path.resolve(__dirname)
    },
    devServer: {
        contentBase: path.resolve(__dirname)
    },
    plugins: [
        // new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: 'index.html',
            inject: 'head',
            minify: {
                collapseWhitespace: true,
                minifyJS: true,
                minifyCSS: true
            }
        })
    ],
    module: {
        rules: [
            {
                test: /\.html$/,
                use: [
                    { 
                        loader: 'html-loader',
                    options: {
                        attributes: true
                      } }
                ]
            },
            {
                test: /\.(less|css)$/,
                use: [
                    { loader: 'style-loader' },
                    { loader: 'css-loader' },
                    { loader: 'postcss-loader' },
                    { loader: 'less-loader?compress' }
                ]
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192,
                            name: 'static/[name].[ext]?[hash:6]',
                            esModule: false
                        }
                    }
                ]
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 8192,
                        name: 'static/[name].[ext]?[hash:6]',
                        outputPath: "imgs",//打包后dist文件夹下将创建的文件目录
                        publicPath: "./imgs", //打包后，build目录下，index.html中img src该访问的路径
                    }
                }
            }
        ]
    }
};
