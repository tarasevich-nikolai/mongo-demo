var path = require('path');

var root = path.join(path.resolve(__dirname), '..');

console.log("Root directory ", root);

var pathmap = {
    root: root,
    npm: {
        descriptors: path.join(root, 'package.json'),
        descriptors: './node_modules/*/package.json'
    },
    build: path.join(root, 'build'),
    static: {
        index: 'index.html',
        assets: 'assets/**/*.*'
    }
};

module.exports = pathmap;