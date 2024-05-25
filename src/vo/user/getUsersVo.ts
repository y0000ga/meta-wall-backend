import { IUser } from '../../model/user';

export class GetUsersVo {
  public readonly users: IUser[];
  public readonly page: number;
  public readonly limit: number;
  public readonly totalCount: number;

  constructor(
    info: { users: IUser[]; totalCount: number },
    page: number,
    limit: number,
  ) {
    this.users = info.users;
    this.page = page;
    this.limit = limit;
    this.totalCount = info.totalCount;
  }
}
