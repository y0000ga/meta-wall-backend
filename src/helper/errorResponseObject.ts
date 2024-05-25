import { CustomResponseType } from '../type/customResponse.type';
import { HttpStatus } from '../type/response.type';

interface IErrOjb {
  status: string;
  statusCode?: HttpStatus;
  message: string;
  origin?: unknown;
  isOperational?: boolean;
  stack?: string;
}

export class ErrorResponseObject {
  private _status: string = CustomResponseType.UNKNOWN_ERROR;
  private _message: string = '不明錯誤，請洽負責人員';
  private _origin?: unknown;
  private _isOperational: boolean = false;
  private _stack?: string;
  public readonly statusCode: HttpStatus = HttpStatus.INTERNAL_ERROR;

  set status(value: string) {
    this._status = value;
  }

  set message(value: string) {
    this._message = value;
  }

  set origin(value: unknown) {
    this._origin = value;
  }

  set isOperational(value: boolean | undefined) {
    this._isOperational = !!value;
  }

  set stack(value: string | undefined) {
    this._stack = value;
  }

  get status() {
    return this._status;
  }

  get message() {
    if (
      process.env.NODE_ENV === 'dev' ||
      this.isOperational ||
      this.statusCode !== HttpStatus.INTERNAL_ERROR
    ) {
      return this._message;
    } else {
      return '不明錯誤，請洽負責人員';
    }
  }

  get origin() {
    return process.env.NODE_ENV === 'dev' ? this._origin : undefined;
  }

  get stack() {
    return process.env.NODE_ENV === 'dev' ? this._stack : undefined;
  }

  get res() {
    return {
      status: this.status,
      message: this.message,
      origin: this.origin,
      stack: this.stack,
    };
  }

  constructor({
    status,
    message,
    origin,
    isOperational,
    stack,
    statusCode,
  }: IErrOjb) {
    this.status = status;
    this.message = message;
    this.origin = origin;
    this.isOperational = isOperational;
    this.stack = stack;
    if (statusCode) {
      this.statusCode = statusCode;
    }
  }
}
