import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { HydratedDocument } from 'mongoose';
import { Creator } from './shared/Creator.schema';

export type CategoryDocument = HydratedDocument<Category>;

@Schema({ timestamps: true, autoCreate: true })
export class Category extends Creator {
  @Prop()
  _id: mongoose.Types.ObjectId;

  @Prop({
    unique: true,
  })
  name: string;

  @Prop({
    unique: true,
    index: true,
  })
  category_slug: string;

  @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: 'Category' }])
  subCategories: string[];

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
  })
  parentCategory: string;
}

export const CategorySchema = SchemaFactory.createForClass(Category);

CategorySchema.loadClass(Category);
