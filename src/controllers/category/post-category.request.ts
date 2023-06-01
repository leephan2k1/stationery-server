import { ApiProperty } from '@nestjs/swagger';
import { Category } from 'src/schemas/Category.schema';
import mongoose from 'mongoose';

export class PostCategoryRequest {
  @ApiProperty()
  name: string;

  @ApiProperty()
  parentCategory?: string;

  constructor(name: string) {
    this.name = name;
  }

  createEntity(): Category {
    const entity = new Category();

    if (this.parentCategory) {
      entity.parentCategory = new mongoose.Types.ObjectId(
        String(this.parentCategory),
      );
    }
    entity.name = this.name.toLowerCase();
    entity._id = new mongoose.Types.ObjectId();
    return entity;
  }

  createEntityWithoutId(): Category {
    const entity = new Category();
    entity.name = this.name.toLowerCase();
    if (this.parentCategory) {
      entity.parentCategory = new mongoose.Types.ObjectId(
        String(this.parentCategory),
      );
    }
    return entity;
  }
}
