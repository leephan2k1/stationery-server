import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import * as mongoose from 'mongoose';
import { Product } from './Product.model';
import { Creator } from './shared/Creator.model';

export type BrandDocument = HydratedDocument<Brand>;

@Schema({ timestamps: true, autoCreate: true })
export class Brand extends Creator {
  @Prop()
  _id: mongoose.Types.ObjectId;

  @Prop({
    unique: true,
  })
  name: string;

  @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: Product.name }])
  products: string[];
}

export const BrandSchema = SchemaFactory.createForClass(Brand);

BrandSchema.loadClass(Brand);
