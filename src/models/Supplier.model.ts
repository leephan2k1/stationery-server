import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import * as mongoose from 'mongoose';
import { Product } from './Product.model';

export type SupplierDocument = HydratedDocument<Supplier>;

@Schema({ timestamps: true, autoCreate: true })
export class Supplier {
  @Prop()
  _id: mongoose.Types.ObjectId;

  @Prop({ unique: true })
  name: string;

  @Prop()
  country: string;

  @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: Product.name }])
  products: string[];
}

export const SupplierSchema = SchemaFactory.createForClass(Supplier);

SupplierSchema.loadClass(Supplier);
