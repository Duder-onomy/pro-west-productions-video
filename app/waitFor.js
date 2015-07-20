'use strict';

var grasshopper = require('ral')('grasshopper/startup');

module.exports = waitFor;

function waitFor() {
    return grasshopper.start();
}