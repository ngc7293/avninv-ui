const { VueLoaderPlugin } = require('vue-loader');
const webpack = require('webpack');

module.exports = {
    entry: './src/main.ts',
    mode: 'development',
    module: {
        rules: [
            {
                test: /\.ts$/,
                exclude: /(node_modules)/,
                loader: 'ts-loader',
                options: {
                    appendTsSuffixTo: [/\.vue$/]
                }
            },
            {
                test: /\.vue$/,
                exclude: /(node_modules)/,
                use: 'vue-loader',
            },
            {
                test: /\.css$/,
                use: [
                  'vue-style-loader',
                  'css-loader'
                ]
            }
        ]
    },
    resolve: {
        extensions: ['.ts', '.js', '.json']
    },
    plugins: [
        new VueLoaderPlugin(),
        new webpack.DefinePlugin({
            __VUE_OPTIONS_API__: true,
            __VUE_PROD_DEVTOOLS__: true
        })
    ]
}