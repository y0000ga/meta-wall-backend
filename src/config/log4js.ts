import log4js from 'log4js';

const config = {
  appenders: {
    // 定義 appenders
    // 1. 叫做 info 的 appender
    info: {
      type: 'console', // 透過 console 的方式印出錯誤
    },
    // 2. app 的 appender
    // app: {
    //   type: 'file', // 透過輸出檔案的方式記錄 error
    //   filename: 'application.log', // 輸出檔案的名稱
    // },
  },
  // 如果不寫 categories，所有 level 的 log 都會被產生出來
  categories: {
    // default 一定要寫
    default: {
      appenders: [
        'info',
        //'app'
      ], // 加入 appenders
      level: 'info', // 只記錄 info level 以上的 error
    },
  },
};

log4js.configure(config);
export default log4js;

// log level: all => trace => debug => info => warn => error => fatal => off
