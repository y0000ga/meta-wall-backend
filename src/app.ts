import cookieParser from 'cookie-parser';
import express from 'express';
import path from 'path';
import log4js from './config/log4js';
import cors from 'cors';
import passport from 'passport';
import morgan from 'morgan';
import { globalLogger } from './middleware/globalLogger';
import connection from './config/dbConnection';
import { AppError } from './helper/errorHandler';
import { CustomResponseType } from './type/customResponse.type';
import { HttpStatus } from './type/response.type';
import { DefaultException } from './helper/defaultException';
import routers from './route/routers';
import swaggerUi from 'swagger-ui-express';
import swaggerFile from './swagger-output.json';
import { logType } from './helper/constant';
import processErrorListener from './helper/processErrorHandler';
import { googleOauth } from './config/passport';

class App {
  // public 代表可以直接從 instance 裡面取出 Property 的值
  public app: express.Application;

  // private 代表無法直接從 instance 取出 method 來使用
  private initLogger = () => {
    const logger = log4js.getLogger(logType.app); // 取得 Logger 的 instance
    // 我在 config 裡面寫的 level 是 info (較低)，這裡聲明 log level 為 debug (較高)
    // 如果聲明 level 低於 config level 就會印不出來
    this.app.use(log4js.connectLogger(logger, { level: 'debug' }));
  };

  // constructor 建構器，可用於產生相同 property 的 object
  constructor() {
    this.app = express();
    this.initLogger(); // 輸出 log
    this.app.use(cors()); // express 不允許跨域存取，所以用這個來處理 cors 問題
    this.app.use(passport.initialize()); // 不清楚用途
    this.app.use(morgan('dev')); // 不清楚用途：default middleware for log
    this.app.use(express.json()); // 解析 body 中的 json 並 assign 給 req.body
    this.app.use(express.urlencoded({ extended: true })); // 解析 url 並 assign 給 req.body
    this.app.use(cookieParser());
    this.app.use(express.static(path.join(__dirname, 'public')));

    this.app.use(globalLogger); // 記錄每個 request 打進來的狀況

    // 連接 db
    connection();

    // googleOauth
    googleOauth();

    // 程式碼不可預期錯誤
    Object.entries(processErrorListener).forEach(([err, listener]) => {
      process.on(err, listener);
    });

    // router
    routers.forEach((route) => {
      this.app.use(route.getPrefix(), route.getRouters());
    });

    // swagger
    this.app.use('/api-doc', swaggerUi.serve, swaggerUi.setup(swaggerFile));

    // 找不到路由
    this.app.use((_req, _res, next) => {
      return next(
        new AppError(
          CustomResponseType.NOT_SUCH_ROUTE,
          CustomResponseType.NOT_SUCH_ROUTE_MESSAGE,
          false,
          HttpStatus.NOT_FOUND,
        ),
      );
    });

    // 最後一個抓住各種 Error 的地方
    this.app.use(DefaultException);
  }
}

export default new App().app;
