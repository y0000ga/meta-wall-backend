import { NewCommentDTO } from '../dto/post/newCommentDto';
import { CommentModel } from '../model/comment';

export class CommentRepository {
  public createComment = (newCommentDto: NewCommentDTO) => {
    const { user, post, content } = newCommentDto;
    // 確認 post 是否存在
    return CommentModel.create({ user, post, content });
  };
}
