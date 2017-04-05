var gulp = require('gulp'),
    webpack = require('webpack'),
    webpackConfig = require('../webpack.config.js'),
    pathMap = require('../pathmap.js'),
    proxy = require('./modules/proxy.js'),
    proxySettings = require('../proxy-settings.js'),
    args = require('yargs').argv;

var webpackDevserverConfig = {
    contentBase: pathMap.root,
    proxy: {
        '/api/*': {
            target: proxySettings.apiHost
        }
    }
};

gulp.task('dev', function() {
    var compiler = webpack(webpackConfig),
        server = new WebpackDevServer(compiler, webpackDevserverConfig);

    server.listen(8100, "localhost", function(err) {
        if (err) throw err;
    });

    server.app.get('/stop', function(req, resp) {
        resp.send('Stopping server...');
        process.exit();
    });

    server.app.all('/api/*', proxy(proxySettings.apiHost, '/api/*', 80, 443, args.apicache));
});

process.on('uncaughtException', function(err) {
    console.log('A global exception occured:', err);
    console.log('Restart recommender');
});