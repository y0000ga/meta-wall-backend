import multer from 'multer'; // 處理文件上傳到伺服器
import path from 'path';
import { AppError } from '../helper/errorHandler';
import { IUserReq } from '../type/common.type';
import { CustomResponseType } from '../type/customResponse.type';

const validImageExtensions = ['.jpg', '.png', '.jpeg'];

const limits = {
  fileSize: 2 * 1024 * 1024,
};

/**
 * @description 限制接受的上傳格式
 */
const fileFilter = (
  req: IUserReq,
  /**
   * @example   
   {
    fieldname: 'file', // formData 裡面設定的名稱
    originalname: '*\x16 2024-05-09 \x0BH8.17.20.png', // 在使用者電腦裡面的檔案名稱(從中文變成編碼)
    encoding: '7bit',
    mimetype: 'image/png',
   }
   */
  file: Express.Multer.File,
  /**
   * @description 篩選完成後要 call 的 callback func.，next 就是一種 callback func.
   */
  callback: multer.FileFilterCallback,
) => {
  const extension = path.extname(file.originalname).toLowerCase();
  if (!validImageExtensions.includes(extension)) {
    // call callback func 並給 error message
    callback(
      new AppError(
        CustomResponseType.UPLOAD_FILE_ERROR,
        CustomResponseType.UPLOAD_FILE_ERROR_MESSAGE +
          '檔案格式錯誤，僅提供 jpg, jpeg, png 格式',
        true,
      ),
    );
  }
  // 接受檔案
  callback(null, true);
  // callback(null, false) // 不接受檔案
  // callback(err, isAccepted) // 第一個參數代表錯誤，第二個參數代表是否接受該檔案
};

// 不輕易碰觸到 DB，所以用 Multer 把關
export const uploadImage = multer({
  limits, // 限制上傳檔案大小
  fileFilter,
}).any();
// any 代表接受所有檔案相關資訊，並把 array of files 存在 req.files，然後 file 就沒辦法到下個 middleware 了
// 而 multer 這個 middleware 結束後，他也會自定義一個 req.files 這樣的 property，並把符合資格的檔案加進去
// 在 loginVerify 當中，可以自己定義 req.user 這個 property

// 以下這個可以在 Postman 的 request 的 Code snippet
// const formdata = new FormData();
// formdata.append("file", fileInput.files[0], "9724.png_300.png");
// const requestOptions = {
//   method: "POST",
//   body: formdata,
//   redirect: "follow"
// };
// fetch("localhost:3000/upload/file", requestOptions)
//   .then((response) => response.text())
//   .then((result) => console.log(result))
//   .catch((error) => console.error(error));

// 如果有傳大檔案的需求，導致 response 的時間很久，要怎麼處理?
// 1. 一旦 response 時間超過 30 秒就直接 response error
// 2. 進度條
