'use strict';

var path = require('path'),
    logger = require('ral')('logger');

module.exports = admin;

function admin(request, response) {
    logger.debug('admin endpoint hit');
    response.sendfile(path.join(__dirname, '..','public', 'admin', 'index.html'));
}
