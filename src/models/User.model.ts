import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

export enum Sex {
  MALE = 0,
  FEMALE = 1,
}

export enum Role {
  ADMIN = 'admin',
  EMPLOYEE = 'employee',
  USER = 'user',
}

export enum Permission {
  CREATE_PRODUCT = 'create_product',
  UPDATE_PRODUCT = 'update_product',
  DELETE_PRODUCT = 'delete_product',

  CREATE_CATEGORY = 'create_category',
  UPDATE_CATEGORY = 'update_category',
  DELETE_CATEGORY = 'delete_category',

  UPDATE_USER_PERMISSION = 'update_user_permission',
  DELETE_USER_PERMISSION = 'delete_user_permission',
}

@Schema({ timestamps: true, autoCreate: true })
export class User {
  @Prop()
  _id: mongoose.Types.ObjectId;

  @Prop({
    unique: true,
    index: true,
  })
  email: string;

  @Prop()
  password: string;

  @Prop()
  fullName: string;

  @Prop()
  dateOfBirth: Date;

  @Prop()
  sex: Sex;

  @Prop()
  role: Role[];

  @Prop()
  permissions: Permission[];
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.loadClass(User);
