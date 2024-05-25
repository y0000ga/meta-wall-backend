import { NextFunction } from 'express';
import firebaseAdmin from '../helper/firebase'; // 和 firebase 的中間橋梁
import { AppError } from '../helper/errorHandler';
import { CustomResponseType } from '../type/customResponse.type';

const blobConfig = {
  action: 'read' as const, // 權限
  expires: '12-31-2500', // 網址的有效日期
};

/**
 * @description 要用到 storage 這個服務就要加這個
 */
const storage = firebaseAdmin.storage();
/**
 * @description 假想 storage 的儲存空間是一個桶子，可以裝很多檔案
 */
const bucket = storage.bucket();

export class UploadRepository {
  public uploadFile = async (
    file: Express.Multer.File,
    name: string,
    next: NextFunction,
  ) => {
    /**
     * @description Firebase 上傳步驟 1
     * @description 根據檔案原始名稱在本地端建立 blob 物件
     * @description blob 物件透過 uuid 給 blob 物件名稱
     * @description photos/ 代表資料夾路徑
     */
    const blob = bucket.file(name);

    return await new Promise<string>((resolve, reject) => {
      /**
       * @description Firebase 上傳步驟 2
       * @description 在本地建立一個可以寫入 blob 的資訊串流物件
       * @description 透過 stream 將一個一個 chunk 上傳過去
       */
      const blobStream = blob.createWriteStream();

      // Firebase 上傳步驟 3
      // 建立好 blob 物件後才可以將檔案的 buffer 寫入 blobStream，並將檔案傳送過去
      blobStream
        .on('finish', () => {
          // 監聽上傳狀態，上傳完成則 'finish' event，回傳 json 格式
          blob.getSignedUrl(blobConfig, (err, fileUrl) => {
            // 取得檔案的網址
            if (err || !fileUrl) {
              reject(
                next(
                  new AppError(
                    CustomResponseType.UPLOAD_FILE_ERROR,
                    CustomResponseType.UPLOAD_FILE_ERROR_MESSAGE +
                      '檔案 URL 取得失敗',
                    true,
                  ),
                ),
              );
            } else {
              resolve(fileUrl);
            }
          });
        })
        .on('error', () => {
          // 監聽上傳狀態，出現錯誤，觸發 'error' event
          reject(
            next(
              new AppError(
                CustomResponseType.UPLOAD_FILE_ERROR,
                CustomResponseType.UPLOAD_FILE_ERROR_MESSAGE + '上傳失敗',
                true,
              ),
            ),
          );
        })
        .end(file.buffer);
    });
  };
}
