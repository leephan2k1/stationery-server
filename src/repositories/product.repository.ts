import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product, ProductDocument } from 'src/schemas/Product.schema';
import * as slug from 'slug';

@Injectable()
export class ProductRepository {
  constructor(
    @InjectModel(Product.name) private readonly model: Model<ProductDocument>,
  ) {}

  async save(reqBody: Product): Promise<Product> {
    return this.model.create({ ...reqBody, product_slug: slug(reqBody.name) });
  }
}
