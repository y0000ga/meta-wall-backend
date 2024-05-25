import { Meta, body } from 'express-validator';
import { BasePipe } from '../base.pipe';
import { ISignInReq } from '../../type/user.type';

export class SignInPipe extends BasePipe {
  public validation = () => [
    body('password')
      .exists()
      .withMessage('password wrong')
      .isString()
      .withMessage('password wrong')
      .isLength({ min: 8 })
      .withMessage('password wrong'),
    body('account')
      .custom((value: string, { req }: Meta) => {
        const { email } = (req as ISignInReq).body;
        return !(!email && !value);
      })
      .withMessage('account wrong'),
    body('email')
      .custom((value: string, { req }: Meta) => {
        const { account } = (req as ISignInReq).body;
        return !(!account && !value);
      })
      .withMessage(' email wrong'),
    this.validationHandler,
  ];

  constructor() {
    super();
  }
}
