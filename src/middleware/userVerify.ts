import { NextFunction, Response } from 'express';
import { AppError } from '../helper/errorHandler';
import jwt, { TokenExpiredError } from 'jsonwebtoken';
import { IUserReq } from '../type/common.type';
import { Role } from '../type/user.type';
import { IUser, UserModel } from '../model/user';
import { CustomResponseType } from '../type/customResponse.type';

export const logInVerify = async (
  req: IUserReq,
  _res: Response,
  next: NextFunction,
) => {
  try {
    let token: string = '';

    const { authorization } = req.headers;

    if (authorization && authorization.startsWith('Bearer')) {
      token = authorization.split(' ')[1];
    }

    if (!token) {
      return next(
        new AppError(
          CustomResponseType.NOT_LOGIN,
          CustomResponseType.NOT_LOGIN_MESSAGE,
          true,
        ),
      );
    }

    // 驗證 token 正確性
    const decoded = await new Promise((resolve, reject) => {
      jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
        if (err) {
          reject(err);
        } else {
          resolve(payload);
        }
      });
    });

    const { id } = decoded as { id: string };

    if (!id) {
      return next(
        new AppError(
          CustomResponseType.INVALID_USER,
          CustomResponseType.INVALID_USER_MESSAGE,
          true,
        ),
      );
    }

    const user = await UserModel.findById(id, '+password');

    if (!user) {
      return next(
        new AppError(
          CustomResponseType.NOT_LOGIN,
          CustomResponseType.NOT_LOGIN_MESSAGE,
          true,
        ),
      );
    }

    req.user = user;

    next();
  } catch (err) {
    if (err instanceof TokenExpiredError) {
      err.message = CustomResponseType.TOKEN_EXPIRED_MESSAGE;
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      err.status = CustomResponseType.TOKEN_EXPIRED;
    }
    return next(err);
  }
};

export const isAdmin = async (
  req: IUserReq,
  _res: Response,
  next: NextFunction,
) => {
  if (!(req.user && (req.user as IUser).role === Role.admin)) {
    return next(
      new AppError(
        CustomResponseType.PERMISSION_DENIED,
        CustomResponseType.PERMISSION_DENIED_MESSAGE,
        true,
      ),
    );
  }
  next();
};
