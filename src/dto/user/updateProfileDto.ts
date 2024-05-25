import { IUser } from '../../model/user';
import { Gender, IUpdateProfileReq } from '../../type/user.type';

export class UpdateProfileDTO {
  private readonly _user: IUser;
  private readonly _email?: string;
  private readonly _gender?: Gender;
  private readonly _account?: string;
  private readonly _name?: string;
  private readonly _photo?: string;

  get update() {
    return {
      ...(this._gender && { gender: this._gender }),
      ...(this._account && { account: this._account }),
      ...(this._email && { email: this._email }),
      ...(this._photo && { photo: this._photo }),
      ...(this._name && { name: this._name }),
    };
  }

  get user() {
    return this._user;
  }

  constructor(req: IUpdateProfileReq) {
    const { body, user } = req;
    const { email, gender, account, name, photo } = body;
    this._user = user as IUser;
    this._email = email;
    this._gender = gender;
    this._photo = photo;
    this._account = account;
    this._name = name;
  }
}
