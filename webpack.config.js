const { VueLoaderPlugin } = require('vue-loader');

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
            }
        ]
    },
    resolve: {
        extensions: ['.ts', '.js', '.json']
    },
    plugins: [
        new VueLoaderPlugin()
    ]
}