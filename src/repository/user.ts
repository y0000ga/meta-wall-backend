import { SignUpDTO } from '../dto/user/signUpDto';
import { IUser, UserModel } from '../model/user';
import { FollowDTO } from '../dto/user/followDto';
import { SignInDTO } from '../dto/user/signInDto';
import { UpdatePasswordDTO } from '../dto/user/updatePasswordDto';
import bcrypt from 'bcrypt';
import { UpdateProfileDTO } from '../dto/user/updateProfileDto';
import { Types } from 'mongoose';
import { UserFilterDTO } from '../dto/user/userFilterDto';
import { OrderBy } from '../type/common.type';
import { GetFollowingDTO } from '../dto/user/getFollowingDto';
import { NextFunction } from 'express';
import { AppError } from '../helper/errorHandler';
import { updateOptions } from '../helper/constant';

export class UserRepository {
  private createFilter = (userFilterDto: UserFilterDTO) => {
    const { userId } = userFilterDto;
    return {
      ...(userId && { _id: userId }),
    };
  };

  public findUsers = async (userFilterDto: UserFilterDTO) => {
    const { page, limit, sortBy, orderBy } = userFilterDto;
    const filter = this.createFilter(userFilterDto);
    const options = {
      skip: (page - 1) * limit,
      limit,
      sort: `${orderBy === OrderBy.asc ? '+' : '-'}${sortBy}`,
    };
    // TODO: 根據 Admin 確認可以看到什麼資料
    return UserModel.find(filter, null, options);
  };

  public countUsers = async (userFilterDto: UserFilterDTO) => {
    const filter = this.createFilter(userFilterDto);
    return UserModel.countDocuments(filter);
  };

  public createUser = async (signUpDto: SignUpDTO, next: NextFunction) => {
    const { user } = signUpDto;
    return await UserModel.create(user).catch((err) => {
      return next(new AppError(err.status, err.message, true));
    });
  };

  public updatePassword = async (updatePasswordDto: UpdatePasswordDTO) => {
    const { newPassword, userId } = updatePasswordDto;
    const password = await bcrypt.hash(newPassword, 12);
    return await UserModel.findByIdAndUpdate(
      userId,
      {
        password,
      },
      updateOptions,
    );
  };

  public findUser = async (signInDto: SignInDTO): Promise<IUser | null> => {
    const { email, account } = signInDto;
    return await UserModel.findOne({
      ...(email && { email }),
      ...(account && { account }),
    }).select('+password');
  };

  public findUserById = async (id: Types.ObjectId) => {
    return await UserModel.findById(id);
  };

  public updateUser = async (
    updateProfileDto: UpdateProfileDTO,
    next: NextFunction,
  ) => {
    const { update, user } = updateProfileDto;

    const isEmpty = Object.keys(update).length === 0;

    const isSame = !Object.entries(update).find(
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      ([key, value]) => user[`${key}`] !== value,
    );

    if (isEmpty || isSame) {
      return next(new AppError('123', '沒有需要更新的資料', true));
    }

    return await UserModel.findByIdAndUpdate(
      user._id,
      update,
      updateOptions,
    ).select('_id account role name email photo');
  };

  public followUser = async (followDto: FollowDTO) => {
    const { userId, targetId } = followDto;

    const filter = {
      _id: userId, // 找到我自己的 User Document
      'followings.user': { $ne: targetId }, // 並確認我的 followings 裡面沒有目前我要追蹤的那個 targetId
    };

    const update = {
      $addToSet: {
        followings: { user: targetId, createdAt: new Date() }, // 把新的 targetId 加到追蹤列表
      },
    };

    const updatedMe = await UserModel.updateOne(filter, update, updateOptions);

    const targetFilter = {
      _id: targetId,
      'followers.user': { $ne: userId },
    };

    const targetUpdate = {
      $addToSet: {
        followers: { user: userId, createdAt: new Date() },
      },
    };

    await UserModel.updateOne(targetFilter, targetUpdate);
    return updatedMe; // TODO: 想要只回傳 array 而非整個 user
  };

  public unfollowUser = async (followDto: FollowDTO) => {
    const { userId, targetId } = followDto;

    const filter = {
      _id: userId,
    };

    const update = {
      $pull: { followings: { user: targetId } },
    };

    const updatedMe = await UserModel.updateOne(filter, update, updateOptions);

    const targetFilter = {
      _id: targetId,
    };

    const targetUpdate = {
      $pull: { followers: { user: userId } },
    };

    await UserModel.updateOne(targetFilter, targetUpdate);

    return updatedMe;
  };

  public getFollowing = async (followingDto: GetFollowingDTO) => {
    const {
      userId,
      // page, limit, orderBy, sortBy
    } = followingDto;

    // TODO: pagination 分頁
    // const options = {
    //   skip: (page - 1) * limit,
    //   limit,
    //   sort: `${orderBy === OrderBy.asc ? '+' : '-'}${sortBy}`,
    // };
    const user = await UserModel.findOne(
      { _id: userId },
      'followings',
    ).populate({
      path: 'followings.user',
      select: '_id name photo',
    });
    return user ? user.followings : [];
  };
}
