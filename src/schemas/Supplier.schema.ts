import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Document } from 'mongoose';
import { Creator } from './shared/Creator.schema';
import { Product } from './Product.schema';

export type SupplierDocument = Supplier & Document;

@Schema({ timestamps: true, autoCreate: true })
export class Supplier extends Creator {
  @Prop()
  _id: mongoose.Types.ObjectId;

  @Prop({ unique: true })
  name: string;

  @Prop()
  country: string;

  @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }])
  products: Product[];
}

export const SupplierSchema = SchemaFactory.createForClass(Supplier);

SupplierSchema.loadClass(Supplier);
