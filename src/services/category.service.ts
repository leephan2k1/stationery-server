import { Injectable } from '@nestjs/common';
import { PostCategoryRequest } from 'src/controllers/category/post-category.request';
import { CategoryModel } from 'src/models/Category.model';
import { CategoryRepository } from 'src/repositories/category.repository';

@Injectable()
export class CategoryService {
  constructor(private readonly categoryRepo: CategoryRepository) {}

  async create(reqBody: PostCategoryRequest): Promise<CategoryModel> {
    const entity = reqBody.createEntity();
    const model = await this.categoryRepo.save(entity);

    return CategoryModel.fromEntity(model);
  }

  async findOne(slug: string) {
    const model = await this.categoryRepo.findBySlug(slug);

    return CategoryModel.fromEntity(model);
  }

  update(id: number) {
    return `This action updates a #${id} category`;
  }

  remove(id: number) {
    return `This action removes a #${id} category`;
  }

  async validateBody({
    name,
    parentCategory,
  }: {
    name: string;
    parentCategory?: string;
  }) {
    const errs = [];

    if (!name) {
      errs.push('name is missing');
    }

    if (name && name.length === 0) {
      errs.push('name must be longer than or equal 1 character');
    }

    if (name && name.length > 150) {
      errs.push('name must be shorter than or equal 150 characters');
    }

    if (parentCategory && !parentCategory.match(/^[a-f\d]{24}$/i)) {
      errs.push('parentCategory must be mongodb id');
    }

    return errs.length > 0 ? errs : null;
  }
}
