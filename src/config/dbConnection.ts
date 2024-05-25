import { connect } from 'mongoose';
import dotenv from 'dotenv';
import log4js from './log4js';
import { logType } from '../helper/constant';
const logger = log4js.getLogger(logType.initDBConnection);

const connection = async () => {
  dotenv.config();
  try {
    const mongoDbUrl = process.env.DB;
    await connect(mongoDbUrl);
    logger.info('資料庫連接成功');
  } catch (err) {
    logger.error('資料庫連接失敗', err);
    // 這裡也沒辦法 response 什麼了
    process.exit(1); // 發生錯誤，直接把整個 process 關掉
  }
};

export default connection;
