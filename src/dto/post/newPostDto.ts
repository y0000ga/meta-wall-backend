import { Types } from 'mongoose';
import { IUser } from '../../model/user';
import { ICreatePostReq } from '../../type/post.type';

export class NewPostDTO {
  private readonly _user: Types.ObjectId;
  private readonly _image: string;
  private readonly _content: string;

  get user() {
    return this._user;
  }

  get image() {
    return this._image;
  }

  get content() {
    return this._content;
  }

  constructor(req: ICreatePostReq) {
    const { user, body } = req;
    const { content, image } = body;
    this._image = image || '';
    this._user = (user as IUser)._id;
    this._content = content;
  }
}
