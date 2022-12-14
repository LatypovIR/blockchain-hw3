'use strict';

const log = require('log-beautify');

function ts() {
    return (new Date()).toLocaleString();
}

function logImpl(logger, ...data) {
    logger.call(log, ' ' + ts(), ':', ...data)
}

module.exports = {
    debug: function (...data) { logImpl(log.debug, ...data); },
    info: function (...data) { logImpl(log.info, ...data); },
    warning: function (...data) { logImpl(log.warning, ...data); },
    error: function (...data) { logImpl(log.error, ...data); }
}