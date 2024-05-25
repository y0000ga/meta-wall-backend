import { GetPostsSuccess, CreatePostBody, CreatePostSuccess } from './posts';
import { GetUsersSuccess } from './user';

export const definitions = {
  GetUsersSuccess,
  GetPostsSuccess,
  CreatePostBody,
  CreatePostSuccess,
};

export const customDefinitions = [];

export const securityDefinitions = {
  Bearer: {
    type: 'apiKey',
    in: 'header',
    name: 'Authorization',
    description: 'JWT Token',
  },
};
