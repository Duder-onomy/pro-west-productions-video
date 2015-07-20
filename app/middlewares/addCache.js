'use strict';

var logger = require('ral')('logger'),
    configs = require('expressively').configs;

module.exports = function (req, res, next) {
    if (configs.optimize) {
        logger.debug('Enabling Cache Control');
        res.setHeader('Cache-Control', 'public, max-age=' + (365 * 24 * 60 * 60 * 1000));
    } else {
        logger.debug('Not Enabling Cache Control');
    }
    next();
};