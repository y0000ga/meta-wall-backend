import { CustomResponseType } from '../../type/customResponse.type';

export const defaultImageUrl =
  'https://thumb.fakeface.rest/thumb_male_10_8c02e4e9bdc0e103530691acfca605f18caf1766.jpg';

const Post = {
  $_id: '663ccbc8c3521df9ef2c2451',
  $content: '一則新貼文4',
  $image: defaultImageUrl,
  $user: {
    $_id: '663ca0e336d9fb66316534a2',
    $name: 'John',
    $photo: defaultImageUrl,
  },
  $likes: [],
  $createdAt: '2024-05-09T13:12:40.608Z',
  $updatedAt: '2024-05-09T13:12:40.608Z',
};

export const GetPostsSuccess = {
  $status: CustomResponseType.OK,
  $message: CustomResponseType.OK_MESSAGE,
  $data: {
    $posts: [Post],
  },
};

export const CreatePostBody = {
  $user: 'asdfasdfasdfasd',
  $content: '有趣的貼文內容',
  photo: defaultImageUrl,
};

export const CreatePostSuccess = {
  $status: CustomResponseType.OK,
  $message: CustomResponseType.OK_MESSAGE,
  $data: {
    $post: Post,
  },
};
