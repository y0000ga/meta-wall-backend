import { Types } from 'mongoose';
import { IUser } from '../../model/user';
import { IUploadImageReq } from '../../type/upload';
import { FileType } from '../../type/common.type';

export class UploadFileDTO {
  public readonly file: Express.Multer.File;
  public readonly userId: Types.ObjectId;
  public readonly fileType: FileType = FileType.image;

  constructor(req: IUploadImageReq) {
    const { files, query, user } = req;
    this.file = files[0];
    this.userId = (user as IUser)._id;
    this.fileType = query.fileType;
  }
}
