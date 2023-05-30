import { Prop } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { User } from '../User.model';

export abstract class Creator {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  })
  createdBy: User;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  })
  updatedBy: User;

  setCreatedBy(userId: string) {
    const user = new User();
    user._id = new mongoose.Types.ObjectId(userId);
    this.createdBy = user;
  }

  setUpdatedBy(userId: string) {
    const user = new User();
    user._id = new mongoose.Types.ObjectId(userId);
    this.updatedBy = user;
  }
}
