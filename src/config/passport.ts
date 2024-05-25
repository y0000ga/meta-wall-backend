import passport from 'passport';
import { Profile, Strategy, VerifyCallback } from 'passport-google-oauth20';
import dotenv from 'dotenv';
import { UserModel } from '../model/user';
import log4js from './log4js';
import { logType } from '../helper/constant';
import bcrypt from 'bcrypt';
import { throwError } from '../helper/errorHandler';
import { Role } from '../type/user.type';
import { CustomResponseType } from '../type/customResponse.type';

const logger = log4js.getLogger(logType.passport);

const options = {
  google: {
    clientID: process.env.GOOGLE_CLIENT_ID, // passport 和 google 告知後，google 進行驗證
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL, // 導回來的那支 api route，Oauth 會 callback 到這個 URL (也是一支 api)
    // 戳到那支 api 後開始執行 passport.authenticate('google', callbackOptions)，再繼續執行 verify function
  },
};

export const googleOauth = () => {
  dotenv.config();

  const verify = async (
    _accessToken: string,
    _refreshToken: string,
    profile: Profile,
    done: VerifyCallback,
  ) => {
    const { id, displayName, emails, photos, provider } = profile;

    // 確認使用者有沒有使用過 Google 登入
    const user = await UserModel.findOne({
      thirdParties: { $elemMatch: { id } },
    });

    // 已存在的使用者 => 詳細邏輯可以再思考，可能是整合
    if (user) {
      logger.info(`${user._id} 透過 google 登入，google id 為 ${id}`);
      return done(null, user);
    }

    if (!emails) {
      return throwError(
        CustomResponseType.THIRD_PARTY_LOGIN_FAILED,
        CustomResponseType.THIRD_PARTY_LOGIN_FAILED_MESSAGE +
          'Google - 無此 Email',
        true,
      );
    }

    // 不存在的使用者 => 建立使用者
    // default 帳號為 email
    const password = await bcrypt.hash(
      id + process.env.THIRD_PARTY_PASSWORD_SECRET,
      12,
    );
    const newUser = await UserModel.create({
      email: emails[0].value,
      account: emails[0].value,
      password,
      role: Role.member,
      name: displayName,
      ...(photos && { photo: photos[0].value }),
      thirdParties: [
        {
          isVerified: false,
          id,
          provider,
        },
      ],
    });

    return done(null, newUser);
  };

  passport.use(new Strategy(options.google, verify));
};
