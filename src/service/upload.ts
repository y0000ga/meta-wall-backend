import { NextFunction, Response } from 'express';
import { UploadRepository } from '../repository/upload';
import { v4 as uuid } from 'uuid'; // 特定 id
import { UploadFileDTO } from '../dto/user/uploadFileDto';

export class UploadService {
  private readonly uploadRepository: UploadRepository = new UploadRepository();

  public uploadImage = async (
    uploadFileDto: UploadFileDTO,
    _res: Response,
    next: NextFunction,
  ) => {
    const { file, userId, fileType } = uploadFileDto;

    return await this.uploadRepository.uploadFile(
      file,
      `${fileType}/${userId || uuid()}`,
      next,
    );
  };
}
