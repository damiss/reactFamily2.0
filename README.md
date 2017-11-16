# reactFamily 全家桶脚手架从零搭建2.0再次学习版

    Q: --save-dev是什么？
    A: --save-dev 是开发时候依赖的东西, --save 是发布后还需要依赖的东西

## webpack 最基础的配置文件

> const path = require('path');

    module.exports = {

        /*入口*/
        entry: path.join(__dirname, 'src/index.js'),
        
        /*输出到dist文件夹，输出文件名字为bundle.js*/
        output: {
            path: path.join(__dirname, './dist'),
            filename: 'bundle.js'
        }
    };

> 在跟目录输入命令 webpack --config webpack.dev.config.js
    将在dist/bundle.js输出编译过的文件

    现在 我们回头看下webpack究竟做了什么
    把入口文件的index.js 经过处理后 生成了 bundle.js

## 使用babel编译

    首先npm install --save-dev babel-core babel-loader babel-preset-es2015 babel-preset-react babel-preset-stage-0
    其中 babel-preset-es2015变为babel-preset-env来进行安装

### 配置babel 新建.babelrc文件

    {
        "presets": [
            "es2015",
            "react",
            "stage-0"
        ],
        "plugins": []
    }

    在webpack.dev.config.js 增加babel-loader
/*src文件夹下面的以.js结尾的文件，要使用babel解析*/
/*cacheDirectory是用来缓存编译结果，下次编译加速*/
    module: {
        rules: [{
            test: /\.js$/,
            use: ['babel-loader?cacheDirectory=true'],
            include: path.join(__dirname, 'src')
        }]
    }

### 增加 npm script 命令优化

修改 packjson.json
    "scripts": {
        "test": "echo \"Error: no test specified\" && exit 1",
        "dev-build": "webpack --config webpack.dev.config.js"
    }
    这样 在打包的时候,我们只需要 输入npm run dev-build 就可以了


### webpack-dev-server
    小型的静态文件服务器 使用它,可以为webpack打包生成的资源文件提供web服务
    npm install webpack-dev-server --save-dev

    在webpack.dev.config.js中增加

    devServer: {
        contentBase: path.join(_dirname, './dist)
    }

    执行 webpack-dev-server --config webpack.dev.config.js
    http://localhost:8080

    Q:--content-base是什么
    A:URL的根目录,如果不设值默认指向根目录
    webpack-dev-server编译后的文件 都储存在内存中 

## 模块热更新 目的:不是刷新浏览器 而是局部刷新修改过的代码

    修改packjson.json 增加 --hot
    > "dev": "webpack-dev-server --config webpack.dev.config.js --color --progress --hot"
    同时 在入口页面 增加module.hot.accept()

    if(module.hot) {
        module.hot.accept();
    }

    现在碰到一个问题
    当我们修改代码后 并不能保存state的状态
    因此 我们需要用react-hot-loader
    为什么要使用react-hot-loader 因为 react有一些自己的语法(JSX) HMR搞不定
    
    使用方法:
        在.babelrc中的plugins增加"react-hot-loader/babel"
        在webpack.dev.config.js 中入口处增加 'react-hot-loader/patch'
