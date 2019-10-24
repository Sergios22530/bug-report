const path = require("path");

module.exports = {
    outputDir: path.resolve(__dirname, "./assets/assets/"),
    publicPath: process.env.NODE_ENV === 'production' ? '/assets/assets/' : '/',
    chainWebpack: config => {
        if (config.plugins.has('extract-css')) {
            const extractCSSPlugin = config.plugin('extract-css');
            extractCSSPlugin && extractCSSPlugin.tap(() => [{
                filename: 'css/[name].css',
                chunkFilename: 'css/[name].css'
            }])
        }
    },
    configureWebpack: {
        output: {
            filename: 'js/[name].js',
            chunkFilename: 'js/[name].js'
        }
    }
};
