import { Types } from 'mongoose';
import { IUser } from '../../model/user';
import { OrderBy } from '../../type/common.type';
import { IGetFollowingReq, UserSortBy } from '../../type/user.type';

export class GetFollowingDTO {
  private readonly _sortBy: UserSortBy;
  private readonly _orderBy: OrderBy;
  private readonly _page: number;
  private readonly _limit: number;
  private readonly _userId: Types.ObjectId;

  get sortBy() {
    return this._sortBy;
  }

  get orderBy() {
    return this._orderBy;
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

  constructor(req: IGetFollowingReq) {
    const { query, user } = req;
    const { sortBy, orderBy, page, limit } = query;
    this._sortBy = sortBy || UserSortBy.createdAt;
    this._orderBy = orderBy || OrderBy.asc;
    this._page = Number(page);
    this._limit = Number(limit);
    this._userId = (user as IUser)._id;
  }
}
