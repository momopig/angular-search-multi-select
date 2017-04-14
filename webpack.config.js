var path = require('path');
var webpack = require('webpack');

module.exports = {
    entry: {
        app: './src/app.js'
    },
    output: {
        path: path.join(__dirname, "src/.dist_js"),
        filename: "angular-search-multi-select.js",
        libraryTarget: 'umd',
    },
    module: {
        //加载器配置
        loaders: [
            {test: /\.css$/, loader: 'style-loader!css-loader'},
            {test: /\.less$/, loader: 'style!css!less?sourceMap'},
            //{test: /\.scss$/, loader: 'style!css!sass?sourceMap'},
            {test: /\.html$/, loader: "html"},
            {test: /\.(png|jpg|svg)$/, loader: 'url-loader?limit=8192'}
        ]
    },
    plugins: [
        /*
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        })
        */
    ],
    externals: {
        'angular': 'angular',
    },
    //devtool: '#eval-source-map',
    devtool: '#inline-source-map'
}
