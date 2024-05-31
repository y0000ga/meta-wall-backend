import { CustomResponseType } from '../type/customResponse.type';
import { BaseController } from '.';
import { ICommentPost, ICreatePostReq, IGetPostsReq } from '../type/post.type';
import { PostService } from '../service/post';
import { NewCommentDTO } from '../dto/post/newCommentDto';
import { NewPostDTO } from '../dto/post/newPostDto';
import { PostFilterDTO } from '../dto/post/postFilterDto';
import { GetPostsVo } from '../vo/post/getPostsVo';
import { NextFunction, Request, Response } from 'express';
import { LikePostDTO } from '../dto/post/likePostDto';

class postController extends BaseController {
  private readonly postService: PostService = new PostService();

  public getPosts = async (
    req: IGetPostsReq,
    _res: Response,
    next: NextFunction,
  ) => {
    const postFilterDto = new PostFilterDTO(req);
    const { page, limit } = postFilterDto;
    const info = await this.postService.getPosts(postFilterDto, next);
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

  public getPost = async (
    { params: { postId } }: Request,
    _res: Response,
    next: NextFunction,
  ) => {
    const post = await this.postService.getPost(postId, next);
    return this.formatResponse(
      CustomResponseType.OK_MESSAGE,
      CustomResponseType.OK,
      { post },
    );
  };

  public likePost = async (
    req: Request,
    _res: Response,
    next: NextFunction,
  ) => {
    const likePostDto = new LikePostDTO(req);
    const post = await this.postService.likePost(likePostDto, next);
    return this.formatResponse(
      CustomResponseType.OK_MESSAGE,
      CustomResponseType.OK,
      { post },
    );
  };

  public unlikePost = async (
    req: Request,
    _res: Response,
    next: NextFunction,
  ) => {
    const likePostDto = new LikePostDTO(req);
    const post = await this.postService.unlikePost(likePostDto, next);
    return this.formatResponse(
      CustomResponseType.OK_MESSAGE,
      CustomResponseType.OK,
      { post },
    );
  };

  public commentPost = async (
    req: ICommentPost,
    _res: Response,
    next: NextFunction,
  ) => {
    const newCommentDto = new NewCommentDTO(req);
    const comment = await this.postService.commentPost(newCommentDto, next);
    return this.formatResponse(
      CustomResponseType.OK_MESSAGE,
      CustomResponseType.OK,
      { comment },
    );
  };

  public getUserPosts = async (
    req: Request,
    _res: Response,
    next: NextFunction,
  ) => {
    const postFilterDto = new PostFilterDTO(req);
    const { page, limit } = postFilterDto;
    const info = await this.postService.getPosts(postFilterDto, next);
    return this.formatResponse(
      CustomResponseType.OK_MESSAGE,
      CustomResponseType.OK,
      new GetPostsVo(info, page, limit),
    );
  };
}

export default postController;
