import { Request } from 'express';
import { IUser } from '../../model/user';
import { Types } from 'mongoose';

export class LikePostDTO {
  private readonly _userId: Types.ObjectId;
  private readonly _postId: string;

  get userId() {
    return this._userId;
  }

  get postId() {
    return this._postId;
  }

  constructor(req: Request) {
    const { user, params } = req;
    this._userId = (user as IUser)._id;
    this._postId = params.postId;
  }
}
