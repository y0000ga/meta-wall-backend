import { BaseController } from '.';
import { UploadService } from '../service/upload';
import { NextFunction, Response } from 'express';
import { CustomResponseType } from '../type/customResponse.type';
import { UploadFileDTO } from '../dto/user/uploadFileDto';
import { IUploadImageReq } from '../type/upload';
import { Request } from 'express';

export class UploadController extends BaseController {
  private readonly uploadService: UploadService = new UploadService();

  public uploadImage = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    const uploadFileDto = new UploadFileDTO(req as IUploadImageReq);
    const imageUrl = await this.uploadService.uploadImage(
      uploadFileDto,
      res,
      next,
    );
    return this.formatResponse(
      CustomResponseType.OK,
      CustomResponseType.OK_MESSAGE,
      { photo: imageUrl },
    );
  };
}
