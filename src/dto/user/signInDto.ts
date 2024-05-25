import { ISignInReq } from '../../type/user.type';

export class SignInDTO {
  private readonly _account?: string;
  private readonly _password: string;
  private readonly _email?: string;

  get account() {
    return this._account;
  }

  get password() {
    return this._password;
  }

  get email() {
    return this._email;
  }

  constructor(req: ISignInReq) {
    const { account, password, email } = req.body;
    this._account = account;
    this._email = email;
    this._password = password;
  }
}
