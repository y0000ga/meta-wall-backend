export const schemaOption = {
  versionKey: false,
  timestamps: true,
};

/**
 * @description 加上以下設定，mongoose 才知道有虛擬欄位要補上
 */
export const virtualSchemaOption = {
  toJSON: {
    virtuals: true,
    transform: (_doc: unknown, ret: Record<string, any>) => {
      delete ret.id;
      return ret;
    },
  },
  toObject: {
    virtuals: true,
    transform: (_doc: unknown, ret: Record<string, any>) => {
      delete ret.id;
      return ret;
    },
  },
};

export const logType = {
  baseRoute: 'BaseRoute',
  app: 'App',
  init: 'Init',
  initDBConnection: 'InitDBConnection',
  global: 'Global',
  swagger: 'Swagger',
  defaultException: 'DefaultException',
  process: 'Process',
  passport: 'Passport',
};

export const updateOptions = {
  new: true,
  returnDocument: 'after' as const,
};
