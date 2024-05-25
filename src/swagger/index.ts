import swagger_autogen from 'swagger-autogen';
import {
  customDefinitions,
  definitions,
  securityDefinitions,
} from './definition';
import log4js from '../config/log4js';
import { logType } from '../helper/constant';

const swaggerAutogen = swagger_autogen();

const logger = log4js.getLogger(logType.swagger);

const doc = {
  info: {
    title: 'Meta Wall',
    description: 'Meta Wall 的 API',
  },
  host: `localhost:${process.env.PORT}`,
  basePath: '/api',
  schemes: ['http', 'https'],
  tags: [
    { name: 'Post', description: '貼文' },
    { name: 'User', description: '使用者' },
    { name: 'Upload', description: '上傳檔案' },
  ],
  definitions,
  '@definitions': customDefinitions,
  securityDefinitions,
};

const outputFile = '../swagger-output.json';
const routes = ['src/route/*.ts'];

swaggerAutogen(outputFile, routes, doc)
  .then(() => {
    logger.info('api 文件生成成功');
  })
  .catch((err) => {
    logger.error('swagger' + err);
  });
