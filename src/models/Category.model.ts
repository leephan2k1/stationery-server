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

    if (category.parentCategory) {
      model.parentCategory = String(category.parentCategory);
    }

    model.id = category._id.toString();
    model.name = category.name;

    return model;
  }
}
