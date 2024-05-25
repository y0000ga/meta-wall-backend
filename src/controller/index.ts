import { CustomResponseType } from '../type/customResponse.type';
import { ResponseObject } from '../helper/responseObject';

export abstract class BaseController {
  /**
   * 統一 Response 格式
   * @description controller 們共有的行為就是 response
   */
  public formatResponse<T>(
    message: string,
    status = CustomResponseType.SYSTEM_ERROR,
    data?: T,
  ): ResponseObject {
    const options = {
      status,
      message,
      data,
    };

    return new ResponseObject(options);
  }
}
