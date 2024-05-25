import { NextFunction, Response } from 'express';
import { BaseController } from '.';
import { SignUpDTO } from '../dto/user/signUpDto';
import { UserService } from '../service/user';
import { CustomResponseType } from '../type/customResponse.type';
import {
  ISignInReq,
  IUpdateProfileReq,
  ISignUpReq,
  IUpdatePasswordReq,
  IGetUsersReq,
  IGetLikePostsReq,
  IGetFollowingReq,
} from '../type/user.type';
import { IUserReq } from '../type/common.type';
import { FollowDTO } from '../dto/user/followDto';
import { SignInDTO } from '../dto/user/signInDto';
import { UpdateProfileDTO } from '../dto/user/updateProfileDto';
import { UpdatePasswordDTO } from '../dto/user/updatePasswordDto';
import { SignUpVo } from '../vo/user/signUpVo';
import { UserFilterDTO } from '../dto/user/userFilterDto';
import { IUser } from '../model/user';
import { PostFilterDTO } from '../dto/post/postFilterDto';
import { GetPostsVo } from '../vo/post/getPostsVo';
import { GetFollowingDTO } from '../dto/user/getFollowingDto';
import { GetUsersVo } from '../vo/user/getUsersVo';

class UserController extends BaseController {
  private readonly userService: UserService = new UserService();
  public getUsers = async (req: IGetUsersReq) => {
    const userFilterDto = new UserFilterDTO(req);
    const { page, limit } = userFilterDto;
    const info = await this.userService.getUsers(userFilterDto);
    // 這裡如果有 error 就會到 default Exception
    return this.formatResponse(
      CustomResponseType.OK_MESSAGE,
      CustomResponseType.OK,
      new GetUsersVo(info, page, limit),
    );
  };

  public signUp = async (
    req: ISignUpReq,
    res: Response,
    next: NextFunction,
  ) => {
    const signUpDto = new SignUpDTO(req);
    const user = await this.userService.signUp(signUpDto, next);
    return this.formatResponse(
      CustomResponseType.OK_MESSAGE,
      CustomResponseType.OK,
      user ? new SignUpVo(user) : {},
    );
  };

  public signIn = async (
    req: ISignInReq,
    res: Response,
    next: NextFunction,
  ) => {
    const signInDto = new SignInDTO(req);
    const user = await this.userService.signIn(signInDto, res, next);
    return this.formatResponse(
      CustomResponseType.OK_MESSAGE,
      CustomResponseType.OK,
      user ? new SignUpVo(user) : {},
    );
  };

  public getMe = async (req: IUserReq) => {
    const userId = (req.user as IUser)._id;
    const me = await this.userService.getUser(userId);
    return this.formatResponse(
      CustomResponseType.OK_MESSAGE,
      CustomResponseType.OK,
      me,
    );
  };

  public updatePassword = async (
    req: IUpdatePasswordReq,
    _res: Response,
    next: NextFunction,
  ) => {
    const updatePasswordDto = new UpdatePasswordDTO(req);
    const user = await this.userService.updatePassword(updatePasswordDto, next);
    return this.formatResponse(
      CustomResponseType.OK_MESSAGE,
      CustomResponseType.OK,
      user ? new SignUpVo(user) : {},
    );
  };

  public updateProfile = async (
    req: IUpdateProfileReq,
    _res: Response,
    next: NextFunction,
  ) => {
    const updateProfileDto = new UpdateProfileDTO(req);
    const newMe = await this.userService.updateProfile(updateProfileDto, next);
    return this.formatResponse(
      CustomResponseType.OK_MESSAGE,
      CustomResponseType.OK,
      newMe,
    );
  };

  public followUser = async (req: IUserReq) => {
    const followDto = new FollowDTO(req);
    const followings = await this.userService.followUser(followDto);
    return this.formatResponse(
      CustomResponseType.OK_MESSAGE,
      CustomResponseType.OK,
      { followings },
    );
  };

  public unfollowUser = async (req: IUserReq) => {
    const followDto = new FollowDTO(req);
    const followings = await this.userService.unfollowUser(followDto);
    return this.formatResponse(
      CustomResponseType.OK_MESSAGE,
      CustomResponseType.OK,
      { followings },
    );
  };

  public getLikePosts = async (req: IGetLikePostsReq) => {
    const filterDto = new PostFilterDTO(req);
    const { page, limit } = filterDto;
    const info = await this.userService.getLikePosts(filterDto);
    return this.formatResponse(
      CustomResponseType.OK_MESSAGE,
      CustomResponseType.OK,
      new GetPostsVo(info, page, limit),
    );
  };

  public getFollowing = async (req: IGetFollowingReq) => {
    const followingDto = new GetFollowingDTO(req);
    // const { page, limit } = followingDto;
    const followings = await this.userService.getFollowing(followingDto);
    return this.formatResponse(
      CustomResponseType.OK_MESSAGE,
      CustomResponseType.OK,
      { followings },
    );
  };
}

export default UserController;
