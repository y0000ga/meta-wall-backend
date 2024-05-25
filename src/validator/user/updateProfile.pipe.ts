import { body } from 'express-validator';
import { BasePipe } from '../base.pipe';
import { Gender } from '../../type/user.type';
export class UpdateProfilePipe extends BasePipe {
  public validation = () => [
    body('gender')
      .optional()
      .isIn(Object.keys(Gender))
      .withMessage('gender wrong'),
    body('account').optional().isString().withMessage('account wrong'),
    body('photo').optional().isString().withMessage('photo wrong'),
    body('email').optional().isString().isEmail().withMessage('email wrong'),
    body('name').optional().isString().withMessage('name wrong'),
    this.validationHandler,
  ];
  constructor() {
    super();
  }
}
