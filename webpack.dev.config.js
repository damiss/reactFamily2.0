const path = require('path');
var webpack = require('webpack');

module.exports = {
    /* 入口 */
    entry: [
        'react-hot-loader/patch',
        path.join(__dirname, 'src/index.js')
    ],


    /* 输出到dist文件夹,输出文件名字为bundle.js */
    output: {
        path: path.join(__dirname, './dist'),
        filename: 'bundle.js'
    },

    /* src文件夹下面的以.js结尾的文件,要使用babel解析 */
    /* cacheDirectory是用来缓存编辑的结果,下次编译加速 */
    module: {
        rules: [{
            test: /\.js$/,
            use: ['babel-loader?cacheDirectory=true'],
            include: path.join(__dirname, 'src')
        }]
    },

    devServer: {
        contentBase: path.join(__dirname, './dist'),
        historyApiFallback: true,
        host: '0.0.0.0',
        hot: true
    },
    /* 别名配置,无论在哪个路径下,引用都可以直接引用 */
    resolve: {
        alias: {
            pages: path.join(__dirname, 'src/pages'),
            component: path.join(__dirname, 'src/component'),
            router: path.join(__dirname, 'src/router'),
            actions: path.join(__dirname, 'src/redux/actions'),
            reducers: path.join(__dirname, 'src/redux/reducers')
        }
    },

    plugins: [new webpack.HotModuleReplacementPlugin()]
}