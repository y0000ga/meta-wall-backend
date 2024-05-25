import { Types } from 'mongoose';
import { IUserReq } from '../../type/common.type';
import { IUser } from '../../model/user';

export class FollowDTO {
  private readonly _userId: Types.ObjectId;
  private readonly _targetId: string;

  get userId() {
    return this._userId;
  }

  get targetId() {
    return this._targetId;
  }

  constructor(req: IUserReq) {
    const { user, params } = req;
    this._userId = (user as IUser)._id;
    this._targetId = params.userId;
  }
}
