#!/usr/bin/env node

/**
 * Module dependencies.
 */
import app from '../app';
import http from 'http';
import log4js from '../config/log4js';
import dotenv from 'dotenv';
import { logType } from '../helper/constant';
import { throwError } from '../helper/errorHandler';
import { HttpStatus } from '../type/response.type';

/**
 * @description create instance of Logger，並判斷類別為 init
 */
const logger = log4js.getLogger(logType.init);

dotenv.config();

/**
 * Normalize a port into a number, string, or false.
 */

const normalizePort = (val?: string) => {
  if (!val) {
    return val;
  }
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
};

/**
 * Event listener for HTTP server "error" event.
 */
const onError = (error: NodeJS.ErrnoException) => {
  if (error.syscall !== 'listen') {
    return throwError(
      error.code || '特殊異常',
      error.message,
      true,
      HttpStatus.INTERNAL_ERROR,
    );
  }

  const bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      logger.error(bind + ' requires elevated privileges');
      process.exit(1);
    case 'EADDRINUSE':
      logger.error(bind + ' is already in use');
      process.exit(1);
    default:
      throwError(
        error.code || '特殊異常',
        error.message,
        true,
        HttpStatus.INTERNAL_ERROR,
      );
      return;
  }
};

/**
 * Event listener for HTTP server "listening" event.
 */
const onListening = () => {
  const addr = server.address();
  const bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr!.port;
  logger.info('Listening on ' + bind);
};

/**
 * Get port from environment and store in Express.
 */
const port = normalizePort(process.env.PORT);
app.set('port', port);

/**
 * Create HTTP server.
 */
const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);
