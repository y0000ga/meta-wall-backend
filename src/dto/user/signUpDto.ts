import { ISignUpReq } from '../../type/user.type';

export class SignUpDTO {
  private readonly _email: string;
  private _password: string; // encoded 時才可以再更動
  private readonly _name: string;
  private readonly _account: string;
  private readonly _photo: string;

  get email() {
    return this._email;
  }

  get password() {
    return this._password;
  }

  get name() {
    return this._name;
  }

  get account() {
    return this._account;
  }

  set password(value: string) {
    this._password = value;
  }

  get user() {
    return {
      email: this._email,
      account: this._account,
      name: this._name,
      password: this._password,
      photo: this._photo,
    };
  }

  constructor(req: ISignUpReq) {
    const { password, name, email, account, photo } = req.body;
    this._email = email;
    this._name = name;
    this._password = password;
    this._account = account;
    this._photo = photo || '';
  }
}
