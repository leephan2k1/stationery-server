import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import * as mongoose from 'mongoose';

export type CategoryDocument = HydratedDocument<Category>;

@Schema({ timestamps: true })
export class Category {
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
    trim: true,
    minlength: 1,
    maxlength: 300,
    unique: true,
    index: true,
  })
  category_slug: string;

  @Prop([{ type: mongoose.Types.ObjectId, ref: 'Category' }])
  subCategories: Category[];

  @Prop({
    type: mongoose.Types.ObjectId,
    ref: 'Category',
  })
  parentCategory: Category;

  @Prop({
    required: true,
    type: mongoose.Types.ObjectId,
    ref: 'User',
  })
  createdBy: string;
}

const CategorySchema = SchemaFactory.createForClass(Category);

export { CategorySchema };
