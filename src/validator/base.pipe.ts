import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { AppError } from '../helper/errorHandler';
import { CustomResponseType } from '../type/customResponse.type';

export abstract class BasePipe {
  public abstract validation(): any;

  protected validationHandler = (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const errMsg = errors
        .array()
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        .map(({ path, msg }) => `${path} => ${msg}`)
        .join(';');

      return next(
        new AppError(
          CustomResponseType.FORMAT_ERROR,
          CustomResponseType.FORMAT_ERROR_MESSAGE + errMsg,
          true,
        ),
      );
    }
    next();
  };
  protected constructor() {}
}
