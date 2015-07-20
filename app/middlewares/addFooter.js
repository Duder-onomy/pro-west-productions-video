'use strict';

module.exports = function(req, res, next) {
        res.locals.footer = 'footer here (use a memoized query)';
        next();
};
