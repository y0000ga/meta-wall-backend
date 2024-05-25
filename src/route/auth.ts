import BaseRoute from '.';
import passport from 'passport';
import AuthController from '../controller/auth';

const options = {
  google: {
    // 當使用者進入 /google 這支 router 時，passport 會幫忙導向 google 頁面
    scope: ['email', 'profile'], // 登入成功後需要甚麼東西
  },
};

const callbackOptions = {
  // 因為前後端分離，所以要加 session: false
  // 如果 session 保持為 true 的話，就會被告知 "沒有 session"(沒 express-session)，無法紀錄資料，造成錯誤
  session: false,
};

class AuthRoute extends BaseRoute {
  protected controller!: AuthController;
  public getPrefix = () => {
    return '/auth';
  };
  protected setRouters = () => {
    // google 第三方登入
    this.router.get(
      '/google',
      passport.authenticate('google', options.google),
      // 戳這個 router 後就會直接導向 google 頁面了，所以後面也不需要 this.responseHandler 了
    );
    // 登入完成後，會回來這個頁面
    this.router.get(
      '/google/callback',
      // passport 會解析 google 給的資料
      passport.authenticate('google', callbackOptions),
      this.responseHandler(this.controller.google),
    );
  };

  protected initial = () => {
    this.controller = new AuthController();
    this.setRouters();
  };

  constructor() {
    super();
    this.initial();
  }
}

export default AuthRoute;
