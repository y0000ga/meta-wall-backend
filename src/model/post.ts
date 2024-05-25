import mongoose, { Schema, model } from 'mongoose';
import { schemaOption, virtualSchemaOption } from '../helper/constant';
import { CustomModel, IBaseModel, schemaDef } from '.';

export interface IPost extends IBaseModel {
  content: string;
  image: string;
  user: typeof mongoose.Schema.ObjectId;
  likes: { user: typeof mongoose.Schema.ObjectId; createdAt: Date }[];
}

const { photo } = schemaDef;

const schema = new Schema<IPost>(
  {
    content: {
      type: String,
      required: [true, 'content 未填寫'],
      trim: true,
    },
    image: photo,
    user: {
      type: mongoose.Schema.ObjectId,
      ref: CustomModel.user,
      required: [true, 'user 未填寫'],
    },
    likes: [
      {
        user: {
          type: mongoose.Schema.ObjectId,
          ref: 'user',
        },
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    // 何時才應該讓 schema 裡面寫 array
    // 1. 資料不會太大包
    // comment:[]
  },
  {
    ...schemaOption,
    ...virtualSchemaOption,
  },
);

// virtual => 新增一個虛擬的欄位
// 這裡的寫法代表要新增一個叫作 comments 的虛擬欄位
schema.virtual('comments', {
  ref: CustomModel.comment, // 資料來自 comment Collection
  // 取得資料的條件
  localField: '_id', // 確認在 post 的 _id，local 代表自己
  foreignField: 'post', // 和 comment 裡面的 post 是否相同，foreign 代表 ref 裡面的欄位
});

export const PostModel = model<IPost>(CustomModel.post, schema);
