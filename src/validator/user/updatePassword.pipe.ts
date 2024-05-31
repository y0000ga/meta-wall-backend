import { Meta, body } from 'express-validator';
import { BasePipe } from '../base.pipe';

export class UpdatePasswordPipe extends BasePipe {
  public validation = () => [
    this.validatePassword(body('newPassword')).withMessage('newPassword wrong'),
    this.validatePassword(body('confirmPassword'))
      .custom(
        (
          value: string,
          {
            req: {
              body: { newPassword },
            },
          }: Meta,
        ) => value === newPassword,
      )
      .withMessage('confirmPassword wrong'),
    this.validatePassword(body('oldPassword'))
      .custom(
        (
          value: string,
          {
            req: {
              body: { newPassword },
            },
          }: Meta,
        ) => value !== newPassword,
      )
      .withMessage('oldPassword wrong'),
    this.validationHandler,
  ];

  constructor() {
    super();
  }
}
