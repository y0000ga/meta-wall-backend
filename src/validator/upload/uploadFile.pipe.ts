import { param } from 'express-validator';
import { BasePipe } from '../base.pipe';
import { FileType } from '../../type/common.type';

export class UploadFilePipe extends BasePipe {
  public validation = () => [
    param('fileType')
      .exists()
      .isIn(Object.keys(FileType))
      .withMessage('file type wrong'),
    this.validationHandler,
  ];

  constructor() {
    super();
  }
}
