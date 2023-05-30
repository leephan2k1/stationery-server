import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import * as mongoose from 'mongoose';
import { Creator } from './shared/Creator.model';

export type WarehouseDocument = HydratedDocument<Warehouse>;

export interface ProductInStock {
  sku: string;
  quantity: number;
}

@Schema({ timestamps: true, autoCreate: true })
export class Warehouse extends Creator {
  @Prop()
  _id: mongoose.Types.ObjectId;

  @Prop()
  name: string;

  @Prop()
  location: string;

  @Prop({ index: true })
  products: ProductInStock[];
}

export const WarehouseSchema = SchemaFactory.createForClass(Warehouse);

WarehouseSchema.loadClass(Warehouse);
