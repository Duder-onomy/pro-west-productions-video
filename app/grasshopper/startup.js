'use strict';

var api = require('grasshopper-api'),
    BB = require('bluebird'),
    configs = require('expressively').configs,
    grasshopper = api(configs.grasshopper),
    logger = require('ral')('logger'),
    gh = require('ral')('grasshopper'),
    constants = require('ral')('constants'),
    expressively = require('expressively'),
    productNodeId = constants.grasshopper.productNodeId,
    accessoriesNodeId = constants.grasshopper.accessoriesNodeId,
    memoize = require('memoize-clear');

module.exports = {
    start : start,
    grasshopper : grasshopper
};

function start() {
    return new BB(function(resolve, reject) {
        grasshopper
            .core.event.channel('/system/db')
            .on('start', function(payload, next){
                logger.debug('starting grasshopper');
                grasshopper
                    .core.auth('basic', {
                        username: 'the-app-do-not-delete', password: '}v6~WCNU#L^B#qy('
                    })
                    .then(function(token) {
                        logger.debug('grasshopper authenticated');
                        gh.setRequest(grasshopper.core.request(token));
                        gh.setGrasshopper(grasshopper);
                        resolve();
                        next();
                    })
                    .catch(reject);
            });

        grasshopper
            .core.event.channel('/type/*')
            .on('save', function(kontx, next) {
                expressively.clearCache()
                    .then(function() {
                        next();
                    });
                memoize.clearCache();
            });

        grasshopper
            .core.event.channel('/node/' + productNodeId)
            .on('out', function(kontx, next) {
                gh.request.get()
                    .content
                    .query({
                        filters : [{
                            key : 'fields.parentProducts',
                            cmp : 'in',
                            value : [ kontx.payload._id.toString() ]
                        }],
                        nodes : [
                            accessoriesNodeId
                        ]
                    })
                    .then(function(content) {
                        kontx.payload.fields.accessories = content.results.map(function(accessory) {
                            console.log('------');
                            return accessory.fields.title;
                        });
                        next();
                    });
            });
    });
}
