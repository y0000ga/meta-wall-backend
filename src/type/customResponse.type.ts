export const enum CustomResponseType {
  OK = '6000',
  OK_MESSAGE = '成功',

  FORMAT_ERROR = '6101',
  FORMAT_ERROR_MESSAGE = '輸入格式錯誤：',

  UNKNOWN_ERROR = '6204',
  UNKNOWN_ERROR_MESSAGE = '不明錯誤',

  NO_DATA_FOUND = '6207',
  NO_DATA_FOUND_MESSAGE = '查無資料',

  PAGINATION_INFO_MISSING = '6211',
  PAGINATION_INFO_MISSING_MESSAGE = '沒有給適當的分頁資訊',

  INSERT_ERROR = '6213',
  INSERT_ERROR_MESSAGE = '新增錯誤',

  UPDATE_ERROR = '6214',
  UPDATE_ERROR_MESSAGE = '更新錯誤',

  DELETE_ERROR = '6215',
  DELETE_ERROR_MESSAGE = '刪除錯誤',

  PERMISSION_DENIED = '6401',
  PERMISSION_DENIED_MESSAGE = '不允許使用該方法',

  NOT_SUCH_ROUTE = '6404',
  NOT_SUCH_ROUTE_MESSAGE = '無此路由資訊',

  SYSTEM_ERROR = '6501',
  SYSTEM_ERROR_MESSAGE = '系統錯誤',

  REGISTER_EMAIL_ERROR = '6504',
  REGISTER_EMAIL_ERROR_MESSAGE = '請稍後重試或聯絡管理員',

  INVALID_POST_FILTER = '6506',
  INVALID_POST_FILTER_MESSAGE = '無效的貼文條件',

  INVALID_NEW_POST = '6511',
  INVALID_NEW_POST_MESSAGE = '無效的新貼文',

  TOKEN_EXPIRED = '6302',
  TOKEN_EXPIRED_MESSAGE = 'token 過期',
}
