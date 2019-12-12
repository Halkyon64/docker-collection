'use strict';

const _ = require('lodash');
const moment = require('moment');
const event = require('../components/event');
const Socket = require('../components/socket');
const log4js = require('log4js');
const logger = log4js.getLogger('Record-model');

let init = () => {
    event.getEventEmitter().on('connect', onConnect);
    event.getEventEmitter().on('login', onLogin);
    event.getEventEmitter().on('logout', onLogout);
};

let onConnect = (data) => {
    Socket.action(data.socket, 'login');
};

let onLogin = (data) => {
    Socket.action(data.socket, 'login');
    if (data.token) {
        // return models.Authentication.findOne({
        //     where: {
        //         token: data.token,
        //         expires_at: {
        //             $gte: moment().toISOString()
        //         }
        //     },
        //     include: [{
        //         required: true,
        //         model: models.User.scope('active')
        //     }]
        // }).then((row) => {
        //     if (row) {
        //         data.socket.user = row.User.privateInfo();
        //         data.socket.join(row.User.id);
        //     }
        // });
    }
};

let onLogout = (data) => {
    delete data.socket.user;
};

module.exports = {
    init: init
};
