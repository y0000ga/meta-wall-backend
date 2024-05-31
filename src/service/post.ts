import { NextFunction } from 'express';
import { LikePostDTO } from '../dto/post/likePostDto';
import { NewCommentDTO } from '../dto/post/newCommentDto';
import { NewPostDTO } from '../dto/post/newPostDto';
import { PostFilterDTO } from '../dto/post/postFilterDto';
import { BaseService } from '.';

export class PostService extends BaseService {
  constructor() {
    super();
  }

  public getPosts = async (
    postFilterDto: PostFilterDTO,
    next: NextFunction,
  ) => {
    const { userId } = postFilterDto;
    if (userId) {
      await this.checkUserExistence(userId, next);
    }
    const posts = await this.postRepository.findPosts(postFilterDto);
    const totalCount = await this.postRepository.countPosts(postFilterDto);
    return { posts, totalCount };
  };

  public getPost = async (id: string, next: NextFunction) => {
    const post = await this.checkPostExistence(id, next);
    return post;
  };

  public createPost = async (newPostDto: NewPostDTO) => {
    return await this.postRepository.createPost(newPostDto);
  };

  public commentPost = async (
    newCommentDto: NewCommentDTO,
    next: NextFunction,
  ) => {
    const { post: postId } = newCommentDto;
    await this.checkPostExistence(postId, next);
    return await this.commentRepository.createComment(newCommentDto);
  };

  public likePost = async (likePostDto: LikePostDTO, next: NextFunction) => {
    const { postId } = likePostDto;
    await this.checkPostExistence(postId, next);
    return await this.postRepository.likePost(likePostDto);
  };

  public unlikePost = async (likePostDto: LikePostDTO, next: NextFunction) => {
    const { postId } = likePostDto;
    await this.checkPostExistence(postId, next);
    return await this.postRepository.unlikePost(likePostDto);
  };
}
