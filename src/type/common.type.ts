import { NextFunction, Request, Response } from 'express';
import { Error } from 'mongoose';
import { HttpStatus } from './response.type';
import { IUser } from '../model/user';

export interface IUserReq extends Request {
  user?: IUser | Express.User; // 自訂屬性
}

export enum OrderBy {
  asc = 'asc',
  desc = 'desc',
}

export type TMiddlewareFunc<T> = (
  req: IUserReq,
  res: Response,
  next: NextFunction,
) => T;

export interface ICustomError extends Error {
  status: string;
  errMessage: string;
  statusCode?: HttpStatus;
  isOperational?: boolean;
}

export enum FileType {
  photo = 'photo',
  image = 'image',
}
