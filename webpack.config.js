module.exports = {
    entry: './app.js',
    output: {
        filename: 'bundle.js'
    },
    externals: ['axios'],
    resolve: {
        alias: {
            'js-data-angular': '../dist/js-data-angular.js'
        }
    }
};