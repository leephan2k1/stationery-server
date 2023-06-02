import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { HydratedDocument } from 'mongoose';
import { Contact } from './Contact.schema';
import { Permission } from 'src/common/enums/permission.enum';
import { Gender } from 'src/common/enums/gender.enum';
import { Role } from 'src/common/enums/role.enum';
import { encodePassword } from 'src/utils/bcrypt';

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
  roles: Role[];

  @Prop()
  permissions: Permission[];
}

export const UserSchema = SchemaFactory.createForClass(User);

// hashing password middleware
UserSchema.pre('save', async function (next) {
  try {
    // only hash the password if it has been modified (or is new)
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const user = this;
    if (!user.isModified('password')) return next();

    const hashedPassword = await encodePassword(this.password);
    this.password = hashedPassword;

    next();
  } catch (error) {
    next(error);
  }
});

UserSchema.loadClass(User);
