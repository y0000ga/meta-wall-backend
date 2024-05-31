import { Types } from 'mongoose';
import { LikePostDTO } from '../dto/post/likePostDto';
import { NewPostDTO } from '../dto/post/newPostDto';
import { PostFilterDTO } from '../dto/post/postFilterDto';
import { updateOptions } from '../helper/constant';
import { IPost, PostModel } from '../model/post';
import { OrderBy } from '../type/common.type';

export class PostRepository {
  private createFilter = (postFilterDto: PostFilterDTO) => {
    const { content, userId } = postFilterDto;
    const contentRegex = content ? new RegExp(content) : undefined;
    return {
      ...(userId && { user: userId }),
      ...(contentRegex && { content: { $regex: contentRegex } }),
    };
  };

  public findPosts = async (postFilterDto: PostFilterDTO) => {
    const { page, limit, sortBy, orderBy } = postFilterDto;
    const filter = this.createFilter(postFilterDto);

    const options = {
      skip: (page - 1) * limit,
      limit,
      sort: `${orderBy === OrderBy.asc ? '+' : '-'}${sortBy}`,
    };
    // TODO: 根據 Admin 確認可以看到什麼資料
    // populate 可以連續使用
    return PostModel.find(filter, null, options)
      .populate({
        path: 'user',
        select: 'name _id account photo',
      })
      .populate({
        // populate 不只會找 schema 裡面既有的，也會找 virtual 的
        // 如果不寫 populate 的話，即使 virtual 有設定也找不到
        path: 'comments',
        select: 'content user',
      });
  };

  public getPostById = async (id: Types.ObjectId) => {
    return await PostModel.findById(id)
      .populate({
        path: 'user',
        select: 'name _id account photo',
      })
      .populate({
        path: 'comments',
        select: 'content user',
      });
  };

  public countPosts = async (postFilterDto: PostFilterDTO) => {
    const filter = this.createFilter(postFilterDto);
    return PostModel.countDocuments(filter);
  };

  public createPost = async (newPostDto: NewPostDTO): Promise<IPost> => {
    const { user, content, image } = newPostDto;
    return PostModel.create({ user, content, image });
  };

  public likePost = async (likePostDto: LikePostDTO) => {
    const { userId, postId } = likePostDto;
    const filter = {
      _id: postId,
      'likes.user': { $ne: userId },
    };

    const update = {
      $addToSet: {
        likes: { user: userId, createdAt: new Date() },
      },
    };

    return await PostModel.findOneAndUpdate(filter, update, updateOptions);
  };

  public unlikePost = async (likePostDto: LikePostDTO) => {
    const { userId, postId } = likePostDto;

    const filter = {
      _id: postId,
    };

    const update = {
      $pull: { likes: { user: userId } },
    };

    return await PostModel.findOneAndUpdate(filter, update, updateOptions);
  };

  public getUserLikePosts = async (filterDto: PostFilterDTO) => {
    const { myId } = filterDto;
    const filter = { 'likes.user': myId };
    return await PostModel.find(filter);
  };

  public countUserLikePosts = async (filterDto: PostFilterDTO) => {
    const { myId } = filterDto;
    const filter = { 'likes.user': myId };
    return PostModel.countDocuments(filter);
  };
}
