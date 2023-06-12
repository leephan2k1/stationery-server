import { Injectable } from '@nestjs/common';
import { GetCategoriesQuery } from 'src/controllers/category/get-category.query';
import { PostCategoryRequest } from 'src/controllers/category/post-category.request';
import { PutCategoryRequest } from 'src/controllers/category/put-category.request';
import { CategoryModel } from 'src/models/Category.model';
import { CategoryRepository } from 'src/repositories/category.repository';

@Injectable()
export class CategoryService {
  constructor(private readonly categoryRepo: CategoryRepository) {}

  async create(
    reqBody: PostCategoryRequest,
    userId: string,
  ): Promise<CategoryModel> {
    const entity = reqBody.createEntity();
    entity.setCreatedBy(userId);
    const model = await this.categoryRepo.save(entity);

    return CategoryModel.fromEntity(model);
  }

  async findMany(queries: GetCategoriesQuery) {
    if (!queries.limit) queries.limit = 0;
    if (!queries.page) queries.page = 1;

    const { categories, count } = await this.categoryRepo.findAll(queries);

    return {
      suppliers: categories.map((model) => CategoryModel.fromEntity(model)),
      count,
    };
  }

  async findOne(slug: string): Promise<CategoryModel> {
    const model = await this.categoryRepo.findBySlug(slug);

    return CategoryModel.fromEntity(model);
  }

  async update(
    slug: string,
    reqBody: PutCategoryRequest,
    userId: string,
  ): Promise<CategoryModel> {
    const entity = reqBody.createEntityWithoutId();
    entity.setUpdatedBy(userId);
    const model = await this.categoryRepo.updateBySlug(slug, entity);

    return CategoryModel.fromEntity(model);
  }

  async delete(slug: string): Promise<CategoryModel> {
    const model = await this.categoryRepo.deleteBySlug(slug);

    return CategoryModel.fromEntity(model);
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
