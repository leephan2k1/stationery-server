import { ApiProperty } from '@nestjs/swagger';
import { CreatorModel } from './shared/Creator.model';
import { Category } from 'src/schemas/Category.schema';

export class CategoryModel extends CreatorModel {
  @ApiProperty()
  name: string;

  @ApiProperty()
  category_slug: string;

  @ApiProperty()
  parentCategory?: string;

  @ApiProperty()
  subCategories: CategoryModel[];

  static fromEntity(category: Category) {
    if (!category) return null;

    const model = new CategoryModel();

    model.id = category._id.toString();
    model.name = category.name;
    model.category_slug = category.category_slug;

    if (category.parentCategory) {
      model.parentCategory = String(category.parentCategory);
    }

    if (category.subCategories && category.subCategories.length > 0) {
      model.subCategories = category.subCategories.map((e) =>
        CategoryModel.fromEntity(e),
      );
    }

    return model;
  }
}
