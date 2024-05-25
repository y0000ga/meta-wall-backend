import BaseRoute from '.';
import UserController from '../controller/user';
import { logInVerify } from '../middleware/userVerify';
import { FollowPipe } from '../validator/user/follow.pipe';
import { GetFollowingPipe } from '../validator/user/getFollowing.pipe';
import { GetLikePostsPipe } from '../validator/user/getLikePosts.pipe';
import { GetUsersPipe } from '../validator/user/getUsers.pipe';
import { SignInPipe } from '../validator/user/signIn.pipe';
import { SignUpPipe } from '../validator/user/signUp.pipe';
import { UpdatePasswordPipe } from '../validator/user/updatePassword.pipe';
import { UpdateProfilePipe } from '../validator/user/updateProfile.pipe';

class UserRoute extends BaseRoute {
  protected controller!: UserController;

  public getPrefix = () => {
    return '/users';
  };

  protected setRouters = () => {
    this.router.get(
      '/',
      /**
       * #swagger.tags = ['User']
       * #swagger.summary = '取得使用者列表'
       */
      /**
        #swagger.responses[6000] = {
            description: 'OK',
            schema:{
              $ref:'#/definitions/GetUsersSuccess'
            }
          }
       */
      logInVerify,
      this.usePipe(GetUsersPipe),
      this.responseHandler(this.controller.getUsers),
    );

    this.router.post(
      '/sign_up',
      this.usePipe(SignUpPipe),
      this.responseHandler(this.controller.signUp),
    );

    this.router.post(
      '/sign_in',
      this.usePipe(SignInPipe),
      this.responseHandler(this.controller.signIn),
    );

    this.router.get(
      '/profile',
      logInVerify,
      this.responseHandler(this.controller.getMe),
    );

    this.router.post(
      '/updatePassword',
      logInVerify,
      this.usePipe(UpdatePasswordPipe),
      this.responseHandler(this.controller.updatePassword),
    );

    this.router.patch(
      '/profile',
      logInVerify,
      this.usePipe(UpdateProfilePipe),
      this.responseHandler(this.controller.updateProfile),
    );

    this.router.post(
      '/:userId/follow',
      logInVerify,
      this.usePipe(FollowPipe),
      this.responseHandler(this.controller.followUser),
    );

    this.router.delete(
      '/:userId/unfollow',
      logInVerify,
      this.usePipe(FollowPipe),
      this.responseHandler(this.controller.unfollowUser),
    );

    this.router.get(
      '/getLikeList',
      logInVerify,
      this.usePipe(GetLikePostsPipe),
      this.responseHandler(this.controller.getLikePosts),
    );

    this.router.get(
      '/following',
      logInVerify,
      this.usePipe(GetFollowingPipe),
      this.responseHandler(this.controller.getFollowing),
    );
  };

  protected initial = () => {
    this.controller = new UserController();
    this.setRouters();
  };

  constructor() {
    super();
    this.initial();
  }
}

export default UserRoute;
