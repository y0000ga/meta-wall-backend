import { Meta, body } from 'express-validator';
import { BasePipe } from '../base.pipe';
import { IUpdatePasswordReq } from '../../type/user.type';

export class UpdatePasswordPipe extends BasePipe {
  public validation = () => [
    body('newPassword').exists().isString().withMessage('password wrong'),
    body('confirmPassword')
      .exists()
      .isString()
      .custom((value: string, { req }: Meta) => {
        const { newPassword } = (req as IUpdatePasswordReq).body;
        return newPassword === value;
      })
      .withMessage('confirmPassword wrong'),
    body('oldPassword')
      .exists()
      .isString()
      .custom((value: string, { req }: Meta) => {
        return value !== (req as IUpdatePasswordReq).body.newPassword;
      })
      .withMessage('oldPassword wrong'),
    this.validationHandler,
  ];

  constructor() {
    super();
  }
}
