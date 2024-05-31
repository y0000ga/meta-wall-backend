import { Router } from 'express';
import { ResponseObject } from '../helper/responseObject';
import { BaseController } from '../controller';
import { HttpStatus } from '../type/response.type';
import log4js from '../config/log4js';
import { TMiddlewareFunc } from '../type/common.type';
import { logType } from '../helper/constant';
import { BasePipe } from '../validator/base.pipe';
import { AppError } from '../helper/errorHandler';
import {
  CustomResponseType,
  IErrorResponse,
  MongooseServerErrorCode,
} from '../type/customResponse.type';

const logger = log4js.getLogger(logType.baseRoute);

// abstract 代表不能被實例化，所以會被用來繼承 (extends)
abstract class BaseRoute {
  // public => 公有的，可以在任何地方被訪問到，預設所有的屬性和方法都是 public 的
  public router = Router();
  // private => 私有的，不能在宣告它的類別的外部訪問
  // protected => 是受保護的，它和 private 類似，區別是它在子類別 (有 extends BaseRoute) 中也是允許被訪問的
  protected controller!: BaseController;

  public getRouters() {
    return this.router;
  }

  protected usePipe = <T extends BasePipe>(prototype: new () => T) => {
    const pipe = new prototype();
    return pipe.validation();
  };

  /**
   * 統一處理 Response
   * @description 加上 catch 進行處理
   * @param method Controller Method
   */
  protected responseHandler =
    (
      method: TMiddlewareFunc<Promise<ResponseObject | string>>,
    ): TMiddlewareFunc<void> =>
    (req, res, next) => {
      method
        .call(this.controller, req, res, next)
        .then((result) => {
          if (typeof result === 'string') {
            return res.redirect(result);
          }
          return res.status(HttpStatus.OK).json(result);
        })
        .catch((err) => {
          // 這裡會第一個收到各種 error
          logger.error(err);
          if (err.errorResponse) {
            const { code, keyValue } = err.errorResponse as IErrorResponse;

            if (code === MongooseServerErrorCode.duplicateKey)
              return next(
                new AppError(
                  CustomResponseType.FORMAT_ERROR,
                  CustomResponseType.FORMAT_ERROR_MESSAGE +
                    Object.keys(keyValue).join('、') +
                    ' 已有人註冊使用',
                  true,
                ),
              );
          }
          return next(this.controller.formatResponse(err.message, err.status));
        });
    };
}

export default BaseRoute;
