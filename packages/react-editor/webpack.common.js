const path = require('path');

module.exports = {
    entry: ['./src/index.js'],
    externals: {
        react: 'umd react',
        'react-dom': 'umd react-dom'
    },
    module: {
        rules: [{
            test: /\.(js|jsx)$/,
            exclude: /(node_modules|build)/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env', '@babel/preset-react']
                }
            }
        }]
    },
    output: {
        filename: 'mgnl-react-editor.js',
        path: path.resolve(__dirname, 'build'),
        libraryTarget: 'umd',
        globalObject: 'this'
    }
};
