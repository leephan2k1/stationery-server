import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { HydratedDocument } from 'mongoose';
import { Contact } from './Contact.schema';
import { Permission } from 'src/common/enums/permission.enum';
import { Gender } from 'src/common/enums/gender.enum';
import { Role } from 'src/common/enums/role.enum';

export type UserDocument = HydratedDocument<User>;

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
  first_name: string;

  @Prop()
  last_name: string;

  @Prop()
  contacts: Contact[];

  @Prop()
  dateOfBirth: Date;

  @Prop()
  gender: Gender;

  @Prop()
  role: Role[];

  @Prop()
  permissions: Permission[];
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.loadClass(User);
