import BaseRoute from '.';
import { UploadController } from '../controller/upload';
import { uploadImage } from '../utils/uploadImage'; // multer 把關上傳文件

import { logInVerify } from '../middleware/userVerify';
import { UploadFilePipe } from '../validator/upload/uploadFile.pipe';

export class UploadRoute extends BaseRoute {
  protected controller!: UploadController;

  public getPrefix = () => {
    return '/upload';
  };

  protected setRouters = () => {
    this.router.post(
      '/file/:fileType',
      logInVerify, // 登入後的人才可以上傳東西
      this.usePipe(UploadFilePipe),
      uploadImage, // 確認上傳的圖片格式正確
      this.responseHandler(this.controller.uploadImage),
    );
  };

  protected initial = () => {
    this.controller = new UploadController();
    this.setRouters();
  };
  constructor() {
    super();
    this.initial();
  }
}
