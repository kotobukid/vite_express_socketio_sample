#!/usr/bin/env node

import {Socket} from "socket.io";

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

const io = require('socket.io')(server)

io.of('/ws').on('connection', (socket: Socket) => {
    console.log('connected');
    socket.emit('hello', 'world');

    socket.on('howdy', (arg: string) => {
        console.log(arg);
    })
})

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);


/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val: string) {
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

/**
 * Event listener for HTTP server "error" event.
 */

type Error1 = {
    syscall: string, code: string
}

function onError(error: Error1) {
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
    const addr: string | { port: string | number } | null = server.address();
    const bind = typeof addr === 'string'
        ? 'pipe ' + addr
        // @ts-ignore
        : 'port ' + addr.port;
    debug('Listening on ' + bind);

    // @ts-ignore
    console.log(`start listening on port ${addr.port}`);
}