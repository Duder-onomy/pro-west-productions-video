'use strict';
console.log('reading startup file');

module.exports = startup;

function startup(configs, app) {
    if (configs.optimize) {
        app.enable('etag');
    }
}