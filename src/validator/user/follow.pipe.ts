import { Meta, param } from 'express-validator';
import { BasePipe } from '../base.pipe';
import { IUser } from '../../model/user';

export class FollowPipe extends BasePipe {
  public validation = () => [
    param('userId')
      .exists()
      .isString()
      .custom((value: string, { req }: Meta) => {
        const { _id } = req.user as IUser;
        return _id.toString() !== value;
      })
      .withMessage('userId wrong'),
    this.validationHandler,
  ];
  constructor() {
    super();
  }
}
