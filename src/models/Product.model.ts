import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { HydratedDocument } from 'mongoose';
import { Brand } from './Brand.model';
import { Category } from './Category.model';
import { Supplier } from './Supplier.model';
import { Creator } from './shared/Creator.model';

export type ProductDocument = HydratedDocument<Product>;

@Schema({ timestamps: true, autoCreate: true })
export class Product extends Creator {
  @Prop()
  _id: mongoose.Types.ObjectId;

  @Prop({ unique: true, index: true })
  name: string;

  @Prop({ unique: true, index: true })
  product_slug: string;

  @Prop({ unique: true, index: true })
  sku: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
  })
  category: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Supplier',
  })
  supplier: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Brand',
  })
  brand: string;

  @Prop({ required: true, type: Object })
  specific_properties: object;

  @Prop()
  price: number;

  @Prop()
  weight: number;

  @Prop()
  size: string;

  @Prop()
  thumbnail: string;

  @Prop()
  discount_percent: number;

  @Prop()
  images: string[];

  @Prop()
  stock_available: boolean;

  @Prop()
  description: string;
}

export const ProductSchema = SchemaFactory.createForClass(Product);

ProductSchema.loadClass(Product);
