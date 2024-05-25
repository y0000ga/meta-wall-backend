import { CustomResponseType } from '../type/customResponse.type';
import { BaseController } from '.';
import { ICommentPost, ICreatePostReq, IGetPostsReq } from '../type/post.type';
import { PostService } from '../service/post';
import { NewCommentDTO } from '../dto/post/newCommentDto';
import { NewPostDTO } from '../dto/post/newPostDto';
import { PostFilterDTO } from '../dto/post/postFilterDto';
import { GetPostsVo } from '../vo/post/getPostsVo';
import { Request } from 'express';
import { LikePostDTO } from '../dto/post/likePostDto';

class postController extends BaseController {
  private readonly postService: PostService = new PostService();

  public getPosts = async (req: IGetPostsReq) => {
    const postFilterDto = new PostFilterDTO(req);
    const { page, limit } = postFilterDto;
    const info = await this.postService.getPosts(postFilterDto);
    // 這裡如果有 error 就會到 default exception
    return this.formatResponse(
      CustomResponseType.OK_MESSAGE,
      CustomResponseType.OK,
      new GetPostsVo(info, page, limit),
    );
  };

  public createPost = async (req: ICreatePostReq) => {
    const newPostDto = new NewPostDTO(req);
    const post = await this.postService.createPost(newPostDto);
    // 這裡如果有 error 就會到 default exception
    return this.formatResponse(
      CustomResponseType.OK_MESSAGE,
      CustomResponseType.OK,
      { post },
    );
  };

  public getPost = async (req: Request) => {
    const post = await this.postService.getPost(req.params.postId);
    return this.formatResponse(
      CustomResponseType.OK_MESSAGE,
      CustomResponseType.OK,
      { post },
    );
  };

  public likePost = async (req: Request) => {
    const likePostDto = new LikePostDTO(req);
    const updatedPost = await this.postService.likePost(likePostDto);
    return this.formatResponse(
      CustomResponseType.OK_MESSAGE,
      CustomResponseType.OK,
      { post: updatedPost },
    );
  };

  public unlikePost = async (req: Request) => {
    const likePostDto = new LikePostDTO(req);
    const updatedPost = await this.postService.unlikePost(likePostDto);
    return this.formatResponse(
      CustomResponseType.OK_MESSAGE,
      CustomResponseType.OK,
      { post: updatedPost },
    );
  };

  public commentPost = async (req: ICommentPost) => {
    const newCommentDto = new NewCommentDTO(req);
    const comment = await this.postService.commentPost(newCommentDto);
    return this.formatResponse(
      CustomResponseType.OK_MESSAGE,
      CustomResponseType.OK,
      { comment },
    );
  };

  public getUserPosts = async (req: Request) => {
    const postFilterDto = new PostFilterDTO(req);
    const { page, limit } = postFilterDto;
    const info = await this.postService.getPosts(postFilterDto);
    return this.formatResponse(
      CustomResponseType.OK_MESSAGE,
      CustomResponseType.OK,
      new GetPostsVo(info, page, limit),
    );
  };
}

export default postController;
