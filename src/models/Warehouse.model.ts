import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import * as mongoose from 'mongoose';
import { Creator } from './shared/Creator.model';
import { ProductInStock } from 'src/common/interfaces/productInStock.interface';

export type WarehouseDocument = HydratedDocument<Warehouse>;

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
