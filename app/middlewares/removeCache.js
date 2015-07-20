'use strict';

var onHeaders = require('on-headers'),
    logger = require('ral')('logger');

module.exports = function (req, res, next) {
    logger.debug('remove cache-control');
    res.setHeader('Cache-Control', 'no-cache');
    scrubETag(res);
    next();
};

function scrubETag(res) {
    onHeaders(res, function () {
        logger.debug('remove etag');
        this.removeHeader('ETag');
        this.setHeader('Cache-Control', 'no-cache');
    });
}