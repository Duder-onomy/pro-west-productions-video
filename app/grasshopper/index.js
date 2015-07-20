'use strict';

var gh = null,
    r = null;

module.exports = {
    request : {
        get: function() { return r; }
    },
    grasshopper : {
        get: function() { return gh; }
    },
    setRequest : function(req) {
        r = req;
    },
    setGrasshopper : function(g) {
        gh = g;
    }
};

