'use strict';

const events = require('events');

let eventEmitter = null;

let init = () => {
    eventEmitter = new events.EventEmitter();
};

let getEventEmitter = () => {
    return eventEmitter;
};

module.exports = {
    init: init,
    getEventEmitter: getEventEmitter
};
