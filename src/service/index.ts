import { Types } from 'mongoose';
import { CommentRepository } from '../repository/comment';
import { PostRepository } from '../repository/post';
import { UserRepository } from '../repository/user';
import { AppError } from '../helper/errorHandler';
import { CustomResponseType } from '../type/customResponse.type';
import { NextFunction } from 'express';

export abstract class BaseService {
  public readonly postRepository: PostRepository;
  public readonly commentRepository: CommentRepository;
  public readonly userRepository: UserRepository;

  constructor() {
    this.postRepository = new PostRepository();
    this.commentRepository = new CommentRepository();
    this.userRepository = new UserRepository();
  }

  public checkUserExistence = async (userId: string, next: NextFunction) => {
    const user = await this.userRepository.findUserById(
      new Types.ObjectId(userId),
    );
    if (!user) {
      return next(
        new AppError(
          CustomResponseType.NOT_EXISTED_USER,
          CustomResponseType.NOT_EXISTED_USER_MESSAGE,
          true,
        ),
      );
    }
    return user;
  };

  public checkCommentExistence = async (
    commentId: string,
    next: NextFunction,
  ) => {
    const comment = await this.commentRepository.findCommentById(
      new Types.ObjectId(commentId),
    );
    if (!comment) {
      return next(
        new AppError(
          CustomResponseType.NOT_EXISTED_COMMENT,
          CustomResponseType.NOT_EXISTED_COMMENT_MESSAGE,
          true,
        ),
      );
    }
    return comment;
  };

  public checkPostExistence = async (postId: string, next: NextFunction) => {
    const post = await this.postRepository.getPostById(
      new Types.ObjectId(postId),
    );
    if (!post) {
      return next(
        new AppError(
          CustomResponseType.NOT_EXISTED_POST,
          CustomResponseType.NOT_EXISTED_POST_MESSAGE,
          true,
        ),
      );
    }
    return post;
  };
}
