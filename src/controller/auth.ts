import { BaseController } from '.';
import { IUserReq } from '../type/common.type';
import jwt from 'jsonwebtoken';
import { IUser } from '../model/user';

class AuthController extends BaseController {
  public google = async (req: IUserReq) => {
    // why 寫法不直接 send response 而是要 redirect?
    // 因為 google 他其實是直接進入 callbackUrl，所以前端只會看到 response 的頁面，無法回到原本的網站
    // return this.formatResponse(
    //   CustomResponseType.OK,
    //   CustomResponseType.OK_MESSAGE,
    //   new SignUpVo(req.user as IUser),
    // );

    const { _id, name } = req.user as IUser;
    const token = jwt.sign({ id: _id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_DAY,
    });
    // 直接讓前端從 url 取得 token 與其他資訊，該頁面為空白，只是為了取得資料
    return `http://localhost:${process.env.PORT}/about?token=${token}&name=${name}`;
  };
}

export default AuthController;
