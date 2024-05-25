import { Error } from 'mongoose';
import { HttpStatus } from '../type/response.type';

/**
 * @description - 負責將所有API的錯誤統一並回傳統一 error 格式
 */
export class AppError extends Error {
  // 為甚麼要有 _statusCode 和 statusCode
  // 當 statusCode 要給別人看，確是有條件地進行更改的時候
  private _statusCode: HttpStatus | undefined;
  private _status: string | undefined; // 讓外界無法直接看到或直接操作
  private _isOperational: boolean = false;

  // set 和 get 是外面一定可以使用的
  // 相比 private 和 public 的全開或全關，透過 get 和 set 可以有效的制定 conditionally 的行為
  get status() {
    return this._status;
  }

  set status(value: string | undefined) {
    this._status = value;
  }

  get statusCode() {
    return this._statusCode;
  }

  set statusCode(value: HttpStatus | undefined) {
    this._statusCode = value;
  }

  get isOperational() {
    return this._isOperational;
  }

  set isOperational(value: boolean | undefined) {
    if (value) {
      this._isOperational = true;
    }
  }

  constructor(
    status: string,
    errMessage: string,
    isOperational?: boolean,
    statusCode?: HttpStatus,
  ) {
    super(errMessage);
    this.status = status;
    this.statusCode = statusCode || HttpStatus.BAD_REQUEST;
    this.isOperational = isOperational || false;
  }
}

// const err = new AppError( // => 這個寫法就代表我已經使用 set 了
//   CustomResponseType.NOT_SUCH_ROUTE,
//   HttpStatus.NOT_FOUND,
//   CustomResponseType.NOT_SUCH_ROUTE_MESSAGE,
// );
// err.status // => 使用 get 了

export const throwError = (
  status: string,
  errMessage: string,
  isOperational?: boolean,
  statusCode?: HttpStatus,
): void => {
  const error = new AppError(status, errMessage, isOperational, statusCode);
  throw error;
};
