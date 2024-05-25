import { Types } from 'mongoose';
import { IUserReq, OrderBy } from './common.type';

export interface IGetPostsReq extends IUserReq {
  query: {
    sortBy?: PostSortBy;
    content?: string;
    orderBy?: OrderBy;
    limit?: string;
    page?: string;
  };
}

export interface ICreatePostReq extends IUserReq {
  body: {
    content: string;
    image?: string;
  };
}

export interface ICommentPost extends IUserReq {
  body: {
    content: string;
    post: Types.ObjectId;
  };
}

export enum PostSortBy {
  createdAt = 'createdAt',
}
