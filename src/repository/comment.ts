import { Types } from 'mongoose';
import { NewCommentDTO } from '../dto/post/newCommentDto';
import { CommentModel } from '../model/comment';

export class CommentRepository {
  public createComment = (newCommentDto: NewCommentDTO) => {
    const { user, post, content } = newCommentDto;
    return CommentModel.create({ user, post, content });
  };

  public findCommentById = (commentId: Types.ObjectId) => {
    return CommentModel.findById(commentId);
  };
}
