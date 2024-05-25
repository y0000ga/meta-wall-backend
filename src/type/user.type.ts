import { IUserReq, OrderBy } from './common.type';
import { PostSortBy } from './post.type';

export enum Gender {
  male = 'male',
  female = 'female',
}

export enum Role {
  member = 'member',
  admin = 'admin',
}

export enum UserSortBy {
  createdAt = 'createdAt',
}

export interface IGetUsersReq extends IUserReq {
  query: {
    sortBy?: UserSortBy;
    orderBy?: OrderBy;
    limit?: string;
    page?: string;
  };
}

export interface IGetLikePostsReq extends IUserReq {
  query: {
    sortBy?: PostSortBy;
    orderBy?: OrderBy;
    limit?: string;
    page?: string;
  };
}

export interface IGetFollowingReq extends IUserReq {
  query: {
    sortBy?: UserSortBy;
    orderBy?: OrderBy;
    limit?: string;
    page?: string;
  };
}

export interface ISignUpReq extends IUserReq {
  body: {
    email: string;
    password: string;
    confirmPassword: string;
    name: string;
    account: string;
    photo?: string;
  };
}

export interface ISignInReq extends IUserReq {
  body: {
    account?: string;
    password: string;
    email?: string;
  };
}

export interface IGetUserReq extends IUserReq {
  body: {
    id?: string;
  };
}

export interface IUpdatePasswordReq extends IUserReq {
  body: {
    newPassword: string;
    oldPassword: string;
    confirmPassword: string;
  };
}

export interface IUpdateProfileReq extends IUserReq {
  body: {
    gender?: Gender;
    account?: string;
    photo?: string;
    email?: string;
    name?: string;
  };
}
