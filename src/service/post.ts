import { LikePostDTO } from '../dto/post/likePostDto';
import { NewCommentDTO } from '../dto/post/newCommentDto';
import { NewPostDTO } from '../dto/post/newPostDto';
import { PostFilterDTO } from '../dto/post/postFilterDto';
import { CommentRepository } from '../repository/comment';
import { PostRepository } from '../repository/post';

export class PostService {
  private readonly postRepository: PostRepository = new PostRepository();

  private readonly commentRepository: CommentRepository =
    new CommentRepository();

  public getPosts = async (postFilterDto: PostFilterDTO) => {
    const posts = await this.postRepository.findPosts(postFilterDto);
    const totalCount = await this.postRepository.countPosts(postFilterDto);
    return { posts, totalCount };
  };

  public getPost = async (id: string) => {
    return await this.postRepository.getPostById(id);
  };

  public createPost = async (newPostDto: NewPostDTO) => {
    return await this.postRepository.createPost(newPostDto);
  };

  public commentPost = async (newCommentDto: NewCommentDTO) => {
    return await this.commentRepository.createComment(newCommentDto);
  };

  public likePost = async (likePostDto: LikePostDTO) => {
    return await this.postRepository.likePost(likePostDto);
  };

  public unlikePost = async (likePostDto: LikePostDTO) => {
    return await this.postRepository.unlikePost(likePostDto);
  };
}
