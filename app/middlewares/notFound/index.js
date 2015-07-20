'use strict';

var request = require('ral')('grasshopper').request,
    categoryTypeId = require('ral')('constants').grasshopper.categoryTypeId,
    BB = require('bluebird'),
    logger = require('ral')('logger'),
    _ = require('lodash');

module.exports = notFound;

function notFound(req, res) {
    logger.debug('not found');
    BB.join(
            getNotFound(),
            function(content) {
                logger.debug('not found', req.url);
                res.cache(require.resolve('./view.jade'), _.extend({}, res.locals, content.results[0].fields ));
            })
        .catch(function(error) {
            logger.error(error);
            logger.error('url: ' + req.url);
            res.sendStatus(500);
        });
}

function getNotFound() {
    return request.get()
        .content
        .query({
            filters : [{
                key : 'fields.slug',
                cmp : '=',
                value : 'notFound'
            }],
            types : [
                categoryTypeId
            ],
            options : {
                limit : 1
            }
        });
}
