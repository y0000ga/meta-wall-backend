import log4js from '../config/log4js';
import { TMiddlewareFunc } from '../type/common.type';
import { logType } from '../helper/constant';

// create logger instance called globalLogger

const logger = log4js.getLogger(logType.global);

// 印出 api req 打進來的資訊

export const globalLogger: TMiddlewareFunc<void> = (req, _res, next) => {
  // 印出 api 資訊
  logger.info(`request method : ${req.method}`);
  logger.info(`request uri : ${req.url}`);
  logger.info(`request from : ${req.ip}`);
  return next();
};
