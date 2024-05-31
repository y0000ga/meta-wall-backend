import { IPost } from '../../model/post';

export class GetPostsVo {
  public readonly posts: IPost[];
  public readonly totalCount: number;
  public readonly page: number;
  public readonly limit: number;

  constructor(
    info: { posts: IPost[]; totalCount: number } | void,
    page: number,
    limit: number,
  ) {
    this.limit = limit;
    this.totalCount = info?.totalCount || 0;
    this.page = page;
    this.posts = info?.posts || [];
  }
}
