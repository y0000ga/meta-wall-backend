import AuthRoute from './auth';
import PostRoute from './post';
import { UploadRoute } from './upload';
import UserRoute from './user';

const routers = [
  new PostRoute(),
  new UserRoute(),
  new UploadRoute(),
  new AuthRoute(),
];

export default routers;
