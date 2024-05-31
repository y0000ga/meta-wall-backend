import { Meta, body } from 'express-validator';
import { BasePipe } from '../base.pipe';

export class SignUpPipe extends BasePipe {
  public validation = () => [
    body('account')
      .exists()
      .isString()
      .trim()
      .isLength({ min: 8, max: 20 })
      .withMessage('account wrong'),
    this.validatePassword(body('password')).withMessage('password wrong'),
    body('name').exists().trim().isString().withMessage('name wrong'),
    body('email').exists().trim().isEmail().withMessage('email wrong'),
    this.validatePassword(body('confirmPassword'))
      .custom(
        (
          value: string,
          {
            req: {
              body: { password },
            },
          }: Meta,
        ) => password === value,
      )
      .withMessage('confirm password wrong'),
    this.validationHandler,
  ];
  constructor() {
    super();
  }
}
