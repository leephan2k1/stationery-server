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
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
  })
  category: Category;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Supplier',
  })
  supplier: Supplier;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Brand',
  })
  brand: Brand;

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

  setSupplier(supplierId: string) {
    const supplier = new Supplier();
    supplier._id = new mongoose.Types.ObjectId(supplierId);
    this.supplier = supplier;
  }

  setBrand(brandId: string) {
    const brand = new Brand();
    brand._id = new mongoose.Types.ObjectId(brandId);
    this.brand = brand;
  }

  setCategory(categoryId: string) {
    const category = new Category();
    category._id = new mongoose.Types.ObjectId(categoryId);
    this.category = category;
  }
}

export const ProductSchema = SchemaFactory.createForClass(Product);

ProductSchema.loadClass(Product);
