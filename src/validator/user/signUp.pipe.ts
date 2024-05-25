import { Meta, body } from 'express-validator';
import { BasePipe } from '../base.pipe';
import { ISignUpReq } from '../../type/user.type';

export class SignUpPipe extends BasePipe {
  public validation = () => [
    body('account')
      .exists()
      .isString()
      .trim()
      .isLength({ min: 8, max: 20 })
      .withMessage('account wrong'),
    body('password')
      .exists()
      .isString()
      .trim()
      .isLength({ min: 8, max: 20 })
      .withMessage('password wrong'),
    body('name').exists().trim().isString().withMessage('name wrong'),
    body('email').exists().trim().isEmail().withMessage('email wrong'),
    body('confirmPassword')
      .exists()
      .trim()
      .isString()
      .custom((value: string, { req }: Meta) => {
        const { password } = (req as ISignUpReq).body;
        return password === value;
      })
      .withMessage('confirm password wrong'),
    this.validationHandler,
  ];
  constructor() {
    super();
  }
}
