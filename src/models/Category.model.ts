import { ApiProperty } from '@nestjs/swagger';
import { CreatorModel } from './shared/Creator.model';

export class CategoryModel extends CreatorModel {
  @ApiProperty()
  name: string;

  @ApiProperty()
  category_slug: string;

  @ApiProperty()
  subCategories: CategoryModel[];
}
