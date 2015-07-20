'use strict';

var logger = require('solid-logger-js'),
    configs = require('expressively').configs;

switch (configs.env) {
case 'staging':
case 'production':
    logger.init({ adapters : configs.logger });
    break;
default:
    logger.init({ adapters :   [{
        'type' : 'console',
        'application' : 'project_name',
        'machine' : 'dev'
    }] });
}
logger.info('Node Environment:' + configs.env);
module.exports = logger;