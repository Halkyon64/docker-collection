'use strict';

const _ = require('lodash');
const fs = require('fs-extra');
const path = require('path');

require('dotenv').config({path: path.resolve(path.join(__dirname, '..', '.env'))});

process.env.NODE_ENV = process.env.NODE_ENV || process.env.nodeEnv;
process.env.LOG4JS_CONFIG = path.join(__dirname, '..', 'log4js.json');

let config = {
    env: process.env.NODE_ENV,
    host: process.env.nodeHost,
    nodeId: parseInt(process.env.nodeId || 0),
    protocol: process.env.protocol,
    cluster: {
        serverSize: parseInt(process.env.clusterServerSize || 1),
        serverFirstPort: parseInt(process.env.clusterServerFirstPort || 3000)
    },
    base: {
        api: process.env.protocol + process.env.baseApi,
        socket: process.env.protocol + process.env.baseSocket,
        defaultTimezone: (process.env.defaultTimezone && typeof process.env.defaultTimezone == 'string') ? process.env.defaultTimezone : null
    },
    staticVersion: Math.floor(new Date().getTime() / 1000),
    schedule: process.env.schedule,
    scheduleIo: process.env.scheduleIo,
};

fs.stat(config.paths.temp, (error) => {
    if (error) {
        fs.mkdirsSync(config.paths.temp);
    }
});

module.exports = config;
