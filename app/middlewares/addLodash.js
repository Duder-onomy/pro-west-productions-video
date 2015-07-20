'use strict';

var _ = require('lodash');

module.exports = function(req, res, next) {
    res.locals._ = _;
    next();
};

