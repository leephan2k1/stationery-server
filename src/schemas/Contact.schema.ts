import { Prop } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export class Contact extends Document {
  @Prop()
  phone_number: string;

  @Prop()
  address: string;
}
