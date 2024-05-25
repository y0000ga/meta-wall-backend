import { body } from 'express-validator';
import { BasePipe } from '../base.pipe';

export class CreatePostPipe extends BasePipe {
  public validation = () => [
    body('content')
      .exists()
      .isString()
      .trim()
      .isLength({ min: 1 })
      .withMessage('content wrong'),
    this.validationHandler,
  ];

  constructor() {
    super();
  }
}
