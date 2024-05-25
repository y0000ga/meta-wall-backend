import { Document, Types } from 'mongoose';

export enum CustomModel {
  user = 'user',
  post = 'post',
  comment = 'comment',
}

export interface IBaseModel extends Document {
  _id: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

export const schemaDef = {
  photo: {
    type: String,
    default: '',
  },
};
