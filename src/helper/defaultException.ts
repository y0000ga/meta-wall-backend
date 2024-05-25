import { ErrorRequestHandler } from 'express';
import log4js from '../config/log4js';
import { logType } from './constant';
import mongoose from 'mongoose';
import { HttpStatus } from '../type/response.type';
import { CustomResponseType } from '../type/customResponse.type';
import { AppError } from './errorHandler';
import { ErrorResponseObject } from './errorResponseObject';

/**
 * @description create instance of Logger，就可以使用他的 method 和 property 了，DefaultException 是這個 Logger 的 loggerCategory
 */
const logger = log4js.getLogger(logType.defaultException);

export const DefaultException: ErrorRequestHandler = (
  err, // 這個 error 有各種可能性
  _req,
  res,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _next, // 這個 next 一定要留
) => {
  // 最後所有的類型的 Error 都會來這裡
  logger.error(err);

  let errObj: ErrorResponseObject;

  // 貼文者 id string 給成 number from mongoose
  // mongoose 客製化
  if (err instanceof mongoose.Error.ValidationError) {
    errObj = new ErrorResponseObject({
      status: CustomResponseType.FORMAT_ERROR,
      message: Object.entries(err.errors)
        .map(([prop, content]) => {
          return `${prop} : ${content.name}`;
        })
        .join('/'),
      origin: err,
      isOperational: true,
      statusCode: HttpStatus.BAD_REQUEST,
    });
  } else if (err instanceof TypeError) {
    // 貼文內容給數字導致無法 trim from mongoose 程式出錯
    const { message, stack } = err;
    errObj = new ErrorResponseObject({
      status: CustomResponseType.FORMAT_ERROR,
      message,
      isOperational: true,
      stack,
      statusCode: HttpStatus.BAD_REQUEST,
    });
  } else if (err instanceof AppError) {
    // 這裡是我自己設定的 Error
    const {
      status = CustomResponseType.UNKNOWN_ERROR,
      stack,
      isOperational,
      message,
      statusCode,
    } = err;
    errObj = new ErrorResponseObject({
      status,
      message,
      isOperational,
      stack,
      statusCode,
    });
  } else {
    // 未知的錯誤
    const { message, stack } = err;
    errObj = new ErrorResponseObject({
      status: CustomResponseType.UNKNOWN_ERROR,
      message,
      stack,
      statusCode: HttpStatus.INTERNAL_ERROR,
    });
  }

  return res.status(errObj.statusCode).json(errObj.res);
};
