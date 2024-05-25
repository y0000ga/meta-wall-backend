import { Schema, Types, model } from 'mongoose';
import { schemaOption } from '../helper/constant';
import { Role, Gender } from '../type/user.type';
import { CustomModel, IBaseModel, schemaDef } from '.';

export interface IThirdParty {
  id: string;
  provider: string;
  isVerified: boolean;
}

interface IFollow {
  user: Types.ObjectId;
  createdAt: Date;
}

export interface IUser extends IBaseModel {
  name: string;
  email: string;
  photo: string;
  gender: Gender;
  password: string;
  account: string;
  role: Role;
  thirdParties: IThirdParty[];
  followers: IFollow[];
  followings: IFollow[];
}

const thirdPartySchema = new Schema<IThirdParty>({
  isVerified: {
    type: Boolean,
    default: false,
  },
  id: {
    type: String,
    required: true,
  },
  provider: {
    type: String,
    required: true,
  },
});

const { photo } = schemaDef;

const followSchemaDef = {
  user: { type: Schema.ObjectId, ref: CustomModel.user },
  createdAt: Date,
};

const schema = new Schema<IUser>(
  {
    account: {
      type: String,
      required: [true, 'account 未填寫'],
      trim: true,
      minlength: 8,
      unique: true,
    },
    role: {
      type: String,
      enum: Object.keys(Role),
      default: Role.member,
    },
    name: {
      type: String,
      required: [true, 'name 未填寫'],
      trim: true,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      unique: true,
      required: [true, 'email 未填寫'],
      match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'email 未填寫'],
    },
    photo,
    gender: {
      type: String,
      enum: Object.keys(Gender),
    },
    password: {
      type: String,
      required: [true, 'password 未填寫'],
      minlength: 8,
      select: false,
    },
    thirdParties: {
      type: [thirdPartySchema],
    },
    followers: [followSchemaDef],
    followings: [followSchemaDef],
  },
  schemaOption,
);

export const UserModel = model<IUser>(CustomModel.user, schema);
