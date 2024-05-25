import { FileType, IUserReq } from './common.type';

export interface IUploadImageReq extends IUserReq {
  files: Express.Multer.File[];
  query: {
    fileType: FileType;
  };
}
