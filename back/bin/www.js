#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Module dependencies.
 */
const app = require('../app');
const debug = require('debug')('back:server');
const http = require('http');
/**
 * Get port from environment and store in Express.
 */
const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);
/**
 * Create HTTP server.
 */
const server = http.createServer(app);
/**
 * Listen on provided port, on all network interfaces.
 */
const socketOptions = {
    cors: {
        // origin: function (origin: any, fn: any) {
        //   // const isTarget = origin !== undefined && origin.match(/^https?:\/\/www\.test\.net/) !== null;
        //   // return isTarget ? fn(null, origin) : fn('error invalid domain');
        //     return 'http://localhost:5173';
        // },
        origin: 'http://localhost:5173',
        credentials: true
    }
};
const io = require('socket.io')(server, socketOptions);
io.of('/ws').on('connection', (socket) => {
    console.log('connected');
    socket.emit('hello', 'world');
    socket.on('howdy', (arg) => {
        console.log(arg);
    });
});
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);
/**
 * Normalize a port into a number, string, or false.
 */
function normalizePort(val) {
    const port = parseInt(val, 10);
    if (isNaN(port)) {
        // named pipe
        return val;
    }
    if (port >= 0) {
        // port number
        return port;
    }
    return false;
}
function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }
    const bind = typeof port === 'string'
        ? 'Pipe ' + port
        : 'Port ' + port;
    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}
/**
 * Event listener for HTTP server "listening" event.
 */
function onListening() {
    const addr = server.address();
    const bind = typeof addr === 'string'
        ? 'pipe ' + addr
        // @ts-ignore
        : 'port ' + addr.port;
    debug('Listening on ' + bind);
    // @ts-ignore
    console.log(`start listening on port ${addr.port}`);
}
