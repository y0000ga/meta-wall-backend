import { query } from 'express-validator';
import { BasePipe } from '../base.pipe';
import { PostSortBy } from '../../type/post.type';
import { OrderBy } from '../../type/common.type';

export class GetLikePostsPipe extends BasePipe {
  public validation = () => [
    query('sortBy')
      .optional()
      .isIn(Object.keys(PostSortBy))
      .withMessage('sortBy wrong'),
    query('orderBy')
      .optional()
      .isIn(Object.keys(OrderBy))
      .withMessage('orderBy wrong'),
    query('page').exists().toInt().isInt({ min: 1 }).withMessage('page wrong'),
    query('limit')
      .exists()
      .toInt()
      .isInt({ min: 1, max: 100 })
      .withMessage('limit wrong'),
    this.validationHandler,
  ];
  constructor() {
    super();
  }
}
