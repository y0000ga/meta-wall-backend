import { IGetUsersReq, UserSortBy } from '../../type/user.type';
import { OrderBy } from '../../type/common.type';

export class UserFilterDTO {
  private readonly _sortBy: UserSortBy;
  private readonly _orderBy: OrderBy;
  private readonly _page: number;
  private readonly _limit: number;
  private readonly _userId: string;

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

  constructor(req: IGetUsersReq) {
    const { query, params } = req;
    const { sortBy, orderBy, page, limit } = query;
    const { userId } = params;
    this._sortBy = sortBy || UserSortBy.createdAt;
    this._orderBy = orderBy || OrderBy.asc;
    this._page = Number(page);
    this._limit = Number(limit);
    this._userId = userId;
  }
}
