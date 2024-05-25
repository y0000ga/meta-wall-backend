import BaseRoute from '.';
import PostController from '../controller/post';
import { logInVerify } from '../middleware/userVerify';
import { CreatePostPipe } from '../validator/post/createPost.pipe';
import { GetPostsPipe } from '../validator/post/getPosts.pipe';

class PostRoute extends BaseRoute {
  protected controller!: PostController;

  public getPrefix() {
    return '/posts';
  }

  protected setRouters = () => {
    this.router.get(
      '/',
      /**
       * #swagger.tags = ['Post']
       * #swagger.summary = '取得貼文列表'
       */
      /*
       #swagger.parameters['content'] = {
        in: 'query',
        required: false,
        description:"模糊搜尋：貼文內容",
        type:'string',
        example:'某些貼文內容'
       }
       */
      /*
       #swagger.parameters['sortBy'] = {
       in:'query',
       required:false,
       description:'排序標準',
       type:"string",
       example:'-createdAt'
       }
       */
      /*
       #swagger.parameters['orderBy'] = {
       in:'query',
       required:false,
       description:'排序方式',
       type:"string",
       example:'asc'
       }
       */
      /*
       #swagger.parameters['page'] = {
       in:'query',
       required:true,
       description:'頁數',
       type:"string",
       example:'1'
       }
       */
      /*
       #swagger.parameters['limit'] = {
       in:'query',
       required:true,
       description:'每頁資料數',
       type:"string",
       example:'10'
       }
       */
      /*
         #swagger.responses[200] = {
            description:'OK',
            schema:{
               $ref:'#/definitions/GetPostsSuccess'
            }
          }
      */
      this.usePipe(GetPostsPipe),
      this.responseHandler(this.controller.getPosts),
    );
    this.router.post(
      '/',
      /**
       * #swagger.tags = ['Post']
       * #swagger.summary = '新增貼文'
       */
      /*
        #swagger.parameters['obj'] = {
          in:'body',
          description:"欲新增貼文",
          schema:{ $ref:'#/definitions/CreatePostBody'}
        }
       */
      /*
         #swagger.responses[200] = {
            description:'OK',
            schema:{
               $ref:'#/definitions/CreatePostSuccess'
            }
          }
      */
      logInVerify,
      this.usePipe(CreatePostPipe),
      this.responseHandler(this.controller.createPost),
    );

    this.router.get('/:postId', this.responseHandler(this.controller.getPost));

    this.router.post(
      '/:postId/like',
      logInVerify,
      this.responseHandler(this.controller.likePost),
    );

    this.router.delete(
      '/:postId/unlike',
      logInVerify,
      this.responseHandler(this.controller.unlikePost),
    );

    this.router.post(
      '/:postId/comment',
      logInVerify,
      this.responseHandler(this.controller.commentPost),
    );

    this.router.get(
      '/user/:userId',
      this.usePipe(GetPostsPipe),
      this.responseHandler(this.controller.getUserPosts),
    );
  };

  protected initial = () => {
    this.controller = new PostController();
    this.setRouters();
  };

  constructor() {
    super(); // Constructors for derived classes must contain a 'super' call.
    this.initial();
  }
}

export default PostRoute;
