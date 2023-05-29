import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import * as mongoose from 'mongoose';
import { Category } from './Category.model';
import { Supplier } from './Supplier.model';
import { Brand } from './Brand.model';

export type ProductDocument = HydratedDocument<Product>;

@Schema({ timestamps: true })
export class Product {
  @Prop({
    required: true,
    type: String,
    trim: true,
    minlength: 2,
    maxlength: 250,
    unique: true,
    index: true,
  })
  name: string;

  @Prop({
    required: true,
    type: String,
    trim: true,
    minlength: 1,
    maxlength: 300,
    unique: true,
    index: true,
  })
  product_slug: string;

  @Prop({
    required: true,
    type: String,
    trim: true,
    minlength: 1,
    maxlength: 250,
    unique: true,
    index: true,
  })
  sku: string;

  @Prop({
    required: true,
    type: mongoose.Types.ObjectId,
    ref: 'Category',
  })
  category: Category;

  @Prop({ required: true, type: Object })
  specific_properties: object;

  @Prop({
    required: true,
    type: Number,
  })
  price: number;

  @Prop({
    required: true,
    type: Number,
  })
  weight: number;

  @Prop({
    required: true,
    type: String,
    minlength: 1,
  })
  size: string;

  @Prop({ required: true, minlength: 3, type: String })
  thumbnail: string;

  @Prop({
    required: true,
    type: mongoose.Types.ObjectId,
    ref: 'User',
  })
  createdBy: string;

  @Prop({
    type: Number,
    default: 0,
  })
  discount_percent: number;

  @Prop([{ type: String }])
  images: string[];

  @Prop({ type: Boolean })
  stock_available: boolean;

  @Prop({
    trim: true,
    maxlength: 5000,
  })
  description: string;

  @Prop({
    required: true,
    type: mongoose.Types.ObjectId,
    ref: 'Supplier',
  })
  supplier: Supplier;

  @Prop({
    type: mongoose.Types.ObjectId,
    ref: 'Brand',
  })
  brand: Brand;
}

const ProductSchema = SchemaFactory.createForClass(Product);

export { ProductSchema };
