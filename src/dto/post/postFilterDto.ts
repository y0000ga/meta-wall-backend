import { Types } from 'mongoose';
import { IUser } from '../../model/user';
import { OrderBy } from '../../type/common.type';
import { PostSortBy, IGetPostsReq } from '../../type/post.type';

export class PostFilterDTO {
  private readonly _sortBy: PostSortBy;
  private readonly _orderBy: OrderBy;
  private readonly _content?: string;
  private readonly _page: number;
  private readonly _limit: number;
  private readonly _userId: string;
  private readonly _myId?: Types.ObjectId;

  get sortBy() {
    return this._sortBy;
  }

  get orderBy() {
    return this._orderBy;
  }

  get content() {
    return this._content;
  }

  get page() {
    return this._page;
  }

  get limit() {
    return this._limit;
  }

  get userId() {
    return this._userId;
  }

  get myId() {
    return this._myId;
  }

  constructor(req: IGetPostsReq) {
    const { query, params, user } = req;
    const { sortBy, content, orderBy, page, limit } = query;
    const { userId } = params;
    this._myId = user ? (user as IUser)._id : undefined;
    this._content = content;
    this._sortBy = sortBy || PostSortBy.createdAt;
    this._orderBy = orderBy || OrderBy.asc;
    this._page = Number(page);
    this._limit = Number(limit);
    this._userId = userId;
  }
}
