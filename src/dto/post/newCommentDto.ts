import { Types } from 'mongoose';
import { IUser } from '../../model/user';
import { ICommentPost } from '../../type/post.type';

export class NewCommentDTO {
  private readonly _content: string;
  private readonly _user: Types.ObjectId;
  private readonly _post: string;

  get content() {
    return this._content;
  }

  get user() {
    return this._user;
  }

  get post() {
    return this._post;
  }

  constructor(req: ICommentPost) {
    const { body, user, params } = req;
    this._user = (user as IUser)._id;
    this._content = body.content;
    this._post = params.postId;
  }
}
