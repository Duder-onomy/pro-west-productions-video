'use strict';

var cache = require('express-static-file-cache'),
    path = require('path'),
    configs = require('expressively').configs;

module.exports = cache.configure({
    app         : configs.app,
    express     : configs.express,
    cacheDir    : path.join(__dirname, '..', 'cache'),
});