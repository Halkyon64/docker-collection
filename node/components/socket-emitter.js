'use strict';

const config = require('../config');

let pub = {
    init,
    getSocketEmitter
};

let io;

function init() {
    if (!io) {
        io = require('socket.io-emitter')({ host: config.redis.host, port: config.redis.port });
    }

    return pub;
}

function getSocketEmitter() {
    return io;
}

module.exports = pub;