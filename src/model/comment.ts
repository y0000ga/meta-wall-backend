import { CallbackError, PopulateOptions, Schema, Types, model } from 'mongoose';
import { CustomModel, IBaseModel } from '.';
import { schemaOption } from '../helper/constant';

export interface IComment extends IBaseModel {
  content: string;
  user: Types.ObjectId;
  post: Types.ObjectId;
}

const schema = new Schema<IComment>(
  {
    content: {
      type: String,
      trim: true,
      require: [true, '留言內容不得為空'],
    },
    user: {
      type: Schema.ObjectId,
      ref: CustomModel.user,
      require: [true, '留言者不得為空'],
    },
    post: {
      type: Schema.ObjectId,
      ref: CustomModel.post,
      require: [true, '貼文不得為空'],
    },
  },
  schemaOption,
);

// pre => 當要把整筆資料 populate 之前，先對 user 做 populate，主動作資料管理
// 當使用者用 find 的時候，主動去 populate user 的部分，不用我另外寫
// e.g. ProductModel.find
// 這裡不寫的話，comments 看起來就像 ObjectId array
schema.pre(
  /^find/, // 代表是 find 開頭的，e.g. findById, findByIdAndUpdate
  function (this: any, next: (err?: CallbackError | undefined) => void) {
    const options: PopulateOptions = {
      path: 'user',
      select: 'name id createdAt photo',
    };
    this.populate(options);
    next();
  },
);

export const CommentModel = model<IComment>(CustomModel.comment, schema);
