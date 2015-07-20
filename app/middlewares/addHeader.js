'use strict';

module.exports = function(req, res, next) {
    res.locals.footer = 'header here (use a memoized query)';
    next();
};
