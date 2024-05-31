import { SignUpDTO } from '../dto/user/signUpDto';
import { AppError } from '../helper/errorHandler';
import bcrypt from 'bcrypt';
import { IUser } from '../model/user';
import { NextFunction } from 'express';
import { FollowDTO } from '../dto/user/followDto';
import { SignInDTO } from '../dto/user/signInDto';
import { UpdateProfileDTO } from '../dto/user/updateProfileDto';
import { UpdatePasswordDTO } from '../dto/user/updatePasswordDto';
import { UserFilterDTO } from '../dto/user/userFilterDto';
import { PostFilterDTO } from '../dto/post/postFilterDto';
import { GetFollowingDTO } from '../dto/user/getFollowingDto';
import { CustomResponseType } from '../type/customResponse.type';
import { BaseService } from '.';

export class UserService extends BaseService {
  constructor() {
    super();
  }

  public getUsers = async (userFilterDto: UserFilterDTO) => {
    const users = await this.userRepository.findUsers(userFilterDto);
    const totalCount = await this.userRepository.countUsers(userFilterDto);
    return { users, totalCount };
  };

  public signUp = async (signUpDto: SignUpDTO) => {
    const { password } = signUpDto;
    signUpDto.password = await bcrypt.hash(password, 12);
    return await this.userRepository.createUser(signUpDto);
  };

  public signIn = async (
    signInDto: SignInDTO,
    next: NextFunction,
  ): Promise<IUser | void> => {
    const user = await this.userRepository.findUser(signInDto);

    if (!user) {
      return next(
        new AppError(
          CustomResponseType.NOT_EXISTED_USER,
          CustomResponseType.NOT_EXISTED_USER_MESSAGE + '登入錯誤',
          true,
        ),
      );
    }

    const auth = await bcrypt.compare(signInDto.password, user.password);

    if (!auth) {
      return next(
        new AppError(
          CustomResponseType.NO_DATA_FOUND,
          CustomResponseType.NO_DATA_FOUND_MESSAGE + '帳號或密碼錯誤',
          true,
        ),
      );
    }
    return user;
  };

  public getUser = async (id: string, next: NextFunction) => {
    return await this.checkUserExistence(id, next);
  };

  public updatePassword = async (
    updatePasswordDto: UpdatePasswordDTO,
    next: NextFunction,
  ) => {
    const { dbDecodedPassword, oldPassword } = updatePasswordDto;

    const isCompare = await bcrypt.compare(oldPassword, dbDecodedPassword);

    // 確認舊密碼
    if (!isCompare) {
      return next(
        new AppError(
          CustomResponseType.UPDATE_ERROR,
          CustomResponseType.UPDATE_ERROR_MESSAGE + '舊密碼錯誤',
          true,
        ),
      );
    }

    return await this.userRepository.updatePassword(updatePasswordDto);
  };

  public updateProfile = async (
    updateProfileDto: UpdateProfileDTO,
    next: NextFunction,
  ) => {
    const { update } = updateProfileDto;
    if (Object.keys(update).length === 0) {
      return next(
        new AppError(
          CustomResponseType.UPDATE_ERROR,
          CustomResponseType.UPDATE_ERROR_MESSAGE + '更新內容為空',
          true,
        ),
      );
    }
    return await this.userRepository.updateUser(updateProfileDto, next);
  };

  public followUser = async (followDto: FollowDTO, next: NextFunction) => {
    const { targetId } = followDto;
    await this.checkUserExistence(targetId, next);
    return await this.userRepository.followUser(followDto);
  };

  public unfollowUser = async (followDto: FollowDTO, next: NextFunction) => {
    const { targetId } = followDto;
    await this.checkUserExistence(targetId, next);
    return await this.userRepository.unfollowUser(followDto);
  };

  public getLikePosts = async (filterDto: PostFilterDTO) => {
    const posts = await this.postRepository.getUserLikePosts(filterDto);
    const totalCount = await this.postRepository.countUserLikePosts(filterDto);
    return { posts, totalCount };
  };

  public getFollowing = async (followingDto: GetFollowingDTO) => {
    return await this.userRepository.getFollowing(followingDto);
  };
}
