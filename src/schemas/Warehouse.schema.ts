import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { HydratedDocument } from 'mongoose';
import { ProductInStock } from 'src/common/interfaces/productInStock.interface';
import { Creator } from './shared/Creator.schema';

export type WarehouseDocument = HydratedDocument<Warehouse>;

@Schema({ timestamps: true, autoCreate: true })
export class Warehouse extends Creator {
  @Prop()
  _id: mongoose.Types.ObjectId;

  @Prop({ unique: true })
  name: string;

  @Prop()
  location: string;

  @Prop({ index: true })
  products: ProductInStock[];
}

export const WarehouseSchema = SchemaFactory.createForClass(Warehouse);

WarehouseSchema.loadClass(Warehouse);
