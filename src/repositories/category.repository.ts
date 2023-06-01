import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as slug from 'slug';
import { Category, CategoryDocument } from 'src/schemas/Category.schema';

@Injectable()
export class CategoryRepository {
  constructor(
    @InjectModel(Category.name) private readonly model: Model<CategoryDocument>,
  ) {}

  async save(reqBody: Category): Promise<Category> {
    const category_slug = slug(reqBody.name);
    const newModel = await this.model.create({ ...reqBody, category_slug });

    //update category for parent
    if (reqBody.parentCategory) {
      setTimeout(async () => {
        await this.model.findByIdAndUpdate(reqBody.parentCategory, {
          $addToSet: { subCategories: newModel._id },
        });
      }, 0);
    }

    return newModel;
  }
}