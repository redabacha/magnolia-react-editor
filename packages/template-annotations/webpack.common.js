const path = require('path');
module.exports = {
    entry: ['./src/index.js'],
    module: {
        rules: [{
            test: /\.(js)$/,
            exclude: /(node_modules|build)/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env']
                }
            }
        }]
    },
    output: {
        filename: 'mgnl-service.js',
        path: path.resolve(__dirname, 'build'),
        libraryTarget: 'umd'
    }
};
