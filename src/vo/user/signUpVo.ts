import jwt from 'jsonwebtoken';
import { IUser } from '../../model/user';

export class SignUpVo {
  public readonly token: string = '';

  constructor(user: IUser) {
    const jwtToken = jwt.sign(
      { id: user._id }, // jwt payload
      process.env.JWT_SECRET, // 用來混淆密碼，防止密碼被破解與反解析
      {
        expiresIn: process.env.JWT_EXPIRES_DAY, // exp 過期時間
      },
    );
    this.token = jwtToken;
  }
}
