import { query } from 'express-validator';
import { BasePipe } from '../base.pipe';
import { OrderBy } from '../../type/common.type';
import { CommentSortBy } from '../../type/comment.type';

export class GetFollowingPipe extends BasePipe {
  public validation = () => [
    query('sortBy')
      .optional()
      .isIn(Object.keys(CommentSortBy))
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
