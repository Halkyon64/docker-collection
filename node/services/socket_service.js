'use strict';

const _ = require('lodash');
const moment = require('moment');
const event = require('../components/event');
const Socket = require('../components/socket');
const log4js = require('log4js');
const logger = log4js.getLogger('Test-Model');
const axios = require('axios');

let init = () => {
    console.log('will initialize socket service');
    event.getEventEmitter().on('connect', onConnect);
    event.getEventEmitter().on('test-action', onTest);
};

let onConnect = (data) => {
    logger.info('handshake with client js has done');
    Socket.action(data.socket, 'test-action');
};

let onTest = (data) => {
    logger.info('got request from client to perform test message broadcast');
    Socket.getIo().sockets.emit('action', {
        action: 'hello-from-node',
        data: 'Any further data',
    });
};

module.exports = {
    init: init
};
