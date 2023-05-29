import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import * as mongoose from 'mongoose';
import { Product } from './Product.model';

export type BrandDocument = HydratedDocument<Brand>;

@Schema({ timestamps: true })
export class Brand {
  @Prop({
    required: true,
    type: String,
    trim: true,
    minlength: 1,
    maxlength: 250,
    unique: true,
  })
  name: string;

  @Prop({
    required: true,
    type: mongoose.Types.ObjectId,
    ref: 'User',
  })
  createdBy: string;

  @Prop([{ type: mongoose.Types.ObjectId }])
  products: Product[];
}

const BrandSchema = SchemaFactory.createForClass(Brand);

export { BrandSchema };
