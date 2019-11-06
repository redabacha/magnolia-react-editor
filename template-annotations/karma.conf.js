process.env.CHROME_BIN = require('puppeteer').executablePath();

module.exports = (config) => {
    config.set({
        browsers: ['ChromeHeadless'],
        // ... normal karma configuration
        files: [
            // all files ending in "_test"
            { pattern: 'src/**/*.spec.js', watched: false }
            // each file acts as entry point for the webpack configuration
        ],

        frameworks: ['jasmine'],

        preprocessors: {
            // add webpack as preprocessor
            'src/**/*.spec.js': ['webpack']
        },

        webpack: {
            // karma watches the test entry points
            // (you don't need to specify the entry option)
            // webpack watches dependencies
            // webpack configuration
            entry: ['whatwg-fetch', './src/index.js'],
            module: {
                rules: [{
                    test: /\.(js)$/,
                    exclude: /(node_modules|dist)/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env']
                        }
                    }
                }]
            }
        },

        webpackMiddleware: {
            // webpack-dev-middleware configuration
            // i. e.
            stats: 'errors-only'
        },
        singleRun: true
    });
};
