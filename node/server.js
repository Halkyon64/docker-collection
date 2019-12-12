'use strict';

const path = require('path');
const cluster = require('cluster');
const express = require('express');
const socket = require('./components/socket');
const config = require('./config');
const log4js = require('log4js');
const _ = require('lodash');
const SocketService = require('./services/socket_service');
const event = require('./components/event');
const requestIp = require('request-ip');
const bodyParser = require('body-parser');
const cors = require('cors');

log4js.configure(path.resolve('config/log4js-io.json'));
require('log4js').setGlobalLogLevel(process.env.logLevel || 'INFO');
const logger = log4js.getLogger('server io worker');
logger.info('server io worker run');

event.init();

/*
* Configuring Express.js application
* */

const thisIoPort = config.cluster.serverFirstPort;
const app = express();

app.use(cors());
app.use(requestIp.mw());

app.use(bodyParser.json({limit: '5000mb'}));
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.json());
app.use (express.urlencoded({extended: false}));


/*
* REST API services
* */

app.get('/', function (req, res) {
    res.send('Hello from REST service');
});

app.post('/', function (req, res) {
    let data = null;
    try {
        data = JSON.parse(req.body);
    } catch (e) {
        logger.warn('error during parsing json');
        logger.warn(e);
    }

    socket.getIo().sockets.emit('action', {
        action: 'status-update',
        data: 'note to all connected clients',
    });

    res.status(200).json({code: 'OK'});
});


const server = require('http').Server(app);
server.listen(thisIoPort, function () {
    logger.info(`Listening cluster server io at ${this.address().address}:${this.address().port}`);
});

const io = socket.init(server);


/**
 * Init main socket service
 * It's possible to pass bellow as much services as necessary
 */
SocketService.init();
