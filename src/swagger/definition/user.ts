import { CustomResponseType } from '../../type/customResponse.type';
import { defaultImageUrl } from './posts';

const User = {
  $_id: 'asdfasdfasdfasd',
  $name: '我的名字',
  $photo: defaultImageUrl,
  $email: 'ok@gmail.com',
};

export const GetUsersSuccess = {
  $status: CustomResponseType.OK,
  $message: CustomResponseType.OK_MESSAGE,
  $data: {
    $users: [User],
  },
};
