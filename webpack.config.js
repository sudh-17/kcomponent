var htmlWebpackPlugin = require('html-webpack-plugin')//导入webpack的HTML插件模板
var path = require('path');
//var precss = require('precss');
//var autoprefixer = require('autoprefixer');
var webpack = require('webpack');

module.exports={
    context: __dirname,//上下文
    entry: {
        kselect: __dirname +  '/src/kselect/index.js',
        ktree: __dirname +  '/src/ktree/index.js',
    },
    output:{
        path: __dirname+'/dist/',
        filename: 'js/[name].min.js',
    },
    module:{
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                include: path.resolve(__dirname +'src'),
                exclude: path.resolve( __dirname +'node_modules'),
                options:{
                    presets:['latest']
                }
            },
            {
                test: /\.html$/,
                use: 'html-loader'
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            ident: 'postcss',
                            plugins: [
                                require('autoprefixer')({
                                    browsers:['last 2 versions']
                                })
                            ]
                        }
                    }
                ]
                
            },
            {
                test: /\.less$/,
                use: [
                    'style-loader',
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            ident: 'postcss',
                            plugins: [
                                require('autoprefixer')({
                                    browsers:['last 2 versions']
                                })
                            ]
                        }
                    },
                    'less-loader'
                ]
            },
            {
                test: /\.(png|jpg|gif|svg)/i,
                //使用base64方式编译图片
                use: [{
                        loader: 'url-loader',
                        options:{
                            limit: 20000,//如果编译后的大小大于20k则交给file-loader处理
                            name: 'assets/[name]-[hash:5].[ext]' //编译之后的图片的命名规则（文件大于limit才生效）
                        }
                    },
                    'image-webpack-loader' //图片压缩的loader
                ]
                //使用普通的请求方式编译图片
                /*use: [{
                        loader:'file-loader',
                        options: {
                            name: 'assets/[name]-[hash:5].[ext]' //编译之后的图片的命名规则
                        }
                }],*/
                
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                  limit: 100000
                }
            }
        ]
    },
    plugins:[
        //html插件
        new htmlWebpackPlugin({
            filename:'kselect.html',//HTML文件名称
            template: './src/kselect/index.html', //HTML模板
            inject: 'head',
            chunks: ['kselect'] //对应entry入口的js，按需加载js
        }),
        new htmlWebpackPlugin({
            filename:'ktree.html',//HTML文件名称
            template: './src/ktree/index.html', //HTML模板
            inject: 'head',
            chunks: ['ktree'] //对应entry入口的js，按需加载js
        }),
        new webpack.ProvidePlugin({
            $:'jquery',
            jQuery: 'jquery'
           // 'window.jQuery': 'jquery'
        })
    ]
}