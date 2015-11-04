'use strict';

require('ral').basePath = __dirname;
require('bluebird').longStackTraces();

var expressively        = require('expressively'),
    express             = require('express'),
    app                 = express(),
    path                = require('path'),
    nodeSassMiddleware  = require('node-sass-middleware'),
    autoprefixer        = require('express-autoprefixer');

// These two middleware have to be loaded before the static middleware, so we do it up stream from expressively
app.use('/styles', nodeSassMiddleware({
    src : path.join(__dirname, 'styles'),
    dest : path.join(__dirname, 'public', 'styles'),
    debug : true,
    outputStyle : 'compressed',
    error : function(error) { console.log('error', error); }
}));

// You have to refresh the page once for prefixer to work, since sass has to write the file first.
app.use('/styles', autoprefixer({ browsers : 'last 2 versions', cascade : false }));

expressively
    .start({
        express         : express,
        app             : app,
        baseDirectory   : __dirname,
        verbose         : true
    })
    .catch(function(error) {
        console.log('error', error);
        process.exit(1);
    });