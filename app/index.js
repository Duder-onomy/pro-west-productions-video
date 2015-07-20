'use strict';

//process.env.UV_THREADPOOL_SIZE=64;

require('ral').basePath = __dirname;

var simpleton   = require('expressively');

simpleton
    .start({
        baseDirectory   : __dirname,
        verbose         : true
    })
    .catch(function(error) {
        console.log('error', error);
        process.exit(1);
    });
