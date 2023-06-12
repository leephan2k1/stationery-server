import { Injectable } from '@nestjs/common';
import { PostProductRequest } from 'src/controllers/product';
import { GetProductsQuery } from 'src/controllers/product/get-products.query';
import { ProductModel } from 'src/models/Product.model';
import { ProductRepository } from 'src/repositories/product.repository';

@Injectable()
export class ProductService {
  constructor(private readonly prodRepo: ProductRepository) {}

  async create(
    reqBody: PostProductRequest,
    userId: string,
  ): Promise<ProductModel> {
    const entity = reqBody.createEntity({ withoutId: false });
    entity.setCreatedBy(userId);
    const model = await this.prodRepo.save(entity);

    return ProductModel.fromEntity(model);
  }

  async findMany(queries: GetProductsQuery) {
    if (!queries.limit) queries.limit = 0;
    if (!queries.page) queries.page = 1;
    if (!queries.sort) queries.sort = 'desc';

    const { products, count } = await this.prodRepo.findAll(queries);

    return {
      products: products.map((model) => ProductModel.fromEntity(model)),
      count,
    };
  }

  async findOne(slug: string): Promise<ProductModel> {
    const model = await this.prodRepo.findProdBySlug(slug);

    return ProductModel.fromEntity(model);
  }

  async update(slug: string, reqBody: PostProductRequest, userId: string) {
    const entity = reqBody.createEntity({ withoutId: true });
    entity.setUpdatedBy(userId);
    const model = await this.prodRepo.updateProdBySlug(slug, entity);

    return ProductModel.fromEntity(model);
  }

  async remove(slug: string) {
    const model = await this.prodRepo.deleteBySlug(slug);

    return ProductModel.fromEntity(model);
  }

  async validatePostBody({
    price,
    weight,
    description,
    discount_percent,
    name,
    brand,
    supplier,
    category,
    images,
    size,
    thumbnail,
    specific_properties,
  }: PostProductRequest) {
    const errs = [];

    if (!name) {
      errs.push('names is missing');
    }
    if (!specific_properties) {
      errs.push('specific_properties is missing');
    }
    if (!thumbnail) {
      errs.push('thumbnail is missing');
    }
    if (!size) {
      errs.push('size is missing');
    }
    if (!images) {
      errs.push('images is missing');
    }
    if (!category) {
      errs.push('category is missing');
    }
    if (!supplier) {
      errs.push('supplier is missing');
    }
    if (!brand) {
      errs.push('brand is missing');
    }
    if (discount_percent === undefined) {
      errs.push('discount_percent is missing');
    }
    if (!description) {
      errs.push('description is missing');
    }
    if (weight === undefined) {
      errs.push('weight is missing');
    }
    if (price === undefined) {
      errs.push('price is missing');
    }

    if (price && isNaN(price)) {
      errs.push('price must be a number');
    }
    if (weight && isNaN(weight)) {
      errs.push('weight must be a number');
    }
    if (discount_percent && isNaN(discount_percent)) {
      errs.push('discount_percent must be a number');
    }

    if (name && name.length === 0) {
      errs.push('name must be longer than or equal 1 character');
    }
    if (name && name.length > 150) {
      errs.push('name must be shorter than or equal 150 characters');
    }

    if (brand && !brand.match(/^[a-f\d]{24}$/i)) {
      errs.push('brand must be mongodb id');
    }
    if (supplier && !supplier.match(/^[a-f\d]{24}$/i)) {
      errs.push('supplier must be mongodb id');
    }
    if (category && !category.match(/^[a-f\d]{24}$/i)) {
      errs.push('category must be mongodb id');
    }
    return errs.length > 0 ? errs : null;
  }
}
