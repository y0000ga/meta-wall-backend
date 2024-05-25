import log4js from '../config/log4js';
import { logType } from './constant';

export enum ProcessError {
  uncaughtException = 'uncaughtException',
  unhandledRejection = 'unhandledRejection',
  multipleResolves = 'multipleResolves',
  rejectionHandled = 'rejectionHandled',
}

const logger = log4js.getLogger(logType.process);

const processErrorListener: {
  [ProcessError.uncaughtException]: NodeJS.UncaughtExceptionListener;
  [ProcessError.unhandledRejection]: NodeJS.UnhandledRejectionListener;
  [ProcessError.multipleResolves]: NodeJS.MultipleResolveListener;
  [ProcessError.rejectionHandled]: NodeJS.RejectionHandledListener;
} = {
  [ProcessError.uncaughtException]: (err) => {
    logger.error('process:' + err.name);
    logger.error('name:', err.name);
    logger.error('message:', err.message);
    logger.error('stack', err.stack);
    process.exit(1);
  },
  [ProcessError.unhandledRejection]: (reason, promise) => {
    logger.error('reason:' + reason);
    logger.error('promise:' + promise);
    process.exit(1);
  },
  [ProcessError.multipleResolves]: (type, promise, value) => {
    logger.error('type:' + type);
    logger.error('promise:' + promise);
    logger.error('value:' + value);
    process.exit(1);
  },
  [ProcessError.rejectionHandled]: (promise) => {
    logger.error('promise:', promise);
    process.exit(1);
  },
};

export default processErrorListener;
