'use strict';

const _ = require('lodash');
const event  = require('./event');
const config = require('../config');

let loggerName = 'socket';
const logger = require('log4js').getLogger(loggerName);

let pub = {
    init,
    action,
    getIo
};
let io = null;

function init (server, options) {
    io = require('socket.io')(server);

    io.on('connection', (socket) => {
        onSocketConnect.call(socket);
        socket.on('action', onSocketAction);
        socket.on('disconnect', onSocketDisconnect);
    });

    io.on('error', (socket) => {
        logger.error(socket);
    });

    return io;
}

function onSocketConnect () {
    logger.debug('onConnect:', this.id);
    event.getEventEmitter().emit('connect', {socket: this});
}

function onSocketDisconnect () {
    logger.debug('onSocketDisconnect:', this.id);
    event.getEventEmitter().emit('disconnect', {socket: this});
}

function onSocketAction (options) {
    options.data = options.data || {};
    if (options.action) {
        options.data.socket = this;
        event.getEventEmitter().emit(options.action, options.data);
    }
}

function action (socket, action, data) {
    data = data || {};
    data.action = action;
    if (socket) {
        socket.emit('action', data)
    } else {
        logger.error('Socket not found');
    }
}

function getIo () {
    return io;
}

module.exports = pub;