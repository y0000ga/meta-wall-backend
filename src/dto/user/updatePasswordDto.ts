import { Types } from 'mongoose';
import { IUpdatePasswordReq } from '../../type/user.type';
import { IUser } from '../../model/user';

export class UpdatePasswordDTO {
  private readonly _newPassword: string;
  private readonly _userId: Types.ObjectId;
  private readonly _dbDecodedPassword: string;
  private readonly _oldPassword: string;

  get newPassword() {
    return this._newPassword;
  }

  get userId() {
    return this._userId;
  }

  get dbDecodedPassword() {
    return this._dbDecodedPassword;
  }

  get oldPassword() {
    return this._oldPassword;
  }

  constructor(req: IUpdatePasswordReq) {
    const { body, user } = req;
    const { _id, password } = user as IUser;
    const { newPassword, oldPassword } = body;
    this._newPassword = newPassword;
    this._userId = _id;
    this._dbDecodedPassword = password;
    this._oldPassword = oldPassword;
  }
}
