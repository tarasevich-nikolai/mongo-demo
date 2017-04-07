module.exports = angular
    .module('app.view', [
    ])
    .component('view', {
        template: require('./view.html'),
        controller: require('./view.controller.js')
    });