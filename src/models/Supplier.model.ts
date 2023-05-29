import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import * as mongoose from 'mongoose';
import { Product } from './Product.model';

export type SupplierDocument = HydratedDocument<Supplier>;

@Schema({ timestamps: true })
export class Supplier {
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
    type: String,
  })
  country: string;

  @Prop([{ type: mongoose.Types.ObjectId, ref: 'Product' }])
  products: Product[];
}

const SupplierSchema = SchemaFactory.createForClass(Supplier);

export { SupplierSchema };
