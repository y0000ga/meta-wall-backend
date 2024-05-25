import { SignUpDTO } from '../dto/user/signUpDto';
import { UserRepository } from '../repository/user';
import { AppError } from '../helper/errorHandler';
import bcrypt from 'bcrypt';
import { IUser } from '../model/user';
import { NextFunction, Response } from 'express';
import { FollowDTO } from '../dto/user/followDto';
import { SignInDTO } from '../dto/user/signInDto';
import { UpdateProfileDTO } from '../dto/user/updateProfileDto';
import { UpdatePasswordDTO } from '../dto/user/updatePasswordDto';
import { Types } from 'mongoose';
import { UserFilterDTO } from '../dto/user/userFilterDto';
import { PostFilterDTO } from '../dto/post/postFilterDto';
import { PostRepository } from '../repository/post';
import { GetFollowingDTO } from '../dto/user/getFollowingDto';
import { CustomResponseType } from '../type/customResponse.type';

export class UserService {
  private readonly userRepository = new UserRepository();
  private readonly postRepository = new PostRepository();

  public getUsers = async (userFilterDto: UserFilterDTO) => {
    const users = await this.userRepository.findUsers(userFilterDto);
    const totalCount = await this.userRepository.countUsers(userFilterDto);
    return { users, totalCount };
  };

  public signUp = async (signUpDto: SignUpDTO, next: NextFunction) => {
    const { password } = signUpDto;
    signUpDto.password = await bcrypt.hash(password, 12);
    return await this.userRepository.createUser(signUpDto, next);
  };

  public signIn = async (
    signInDto: SignInDTO,
    _res: Response,
    next: NextFunction,
  ): Promise<IUser | void> => {
    const user = await this.userRepository.findUser(signInDto);

    if (!user) {
      return next(
        new AppError(
          CustomResponseType.NO_DATA_FOUND,
          CustomResponseType.NO_DATA_FOUND_MESSAGE + '沒有這個使用者',
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

  public getUser = async (id: Types.ObjectId) => {
    return await this.userRepository.findUserById(id);
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

  public followUser = async (followDto: FollowDTO) => {
    return await this.userRepository.followUser(followDto);
  };

  public unfollowUser = async (followDto: FollowDTO) => {
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
