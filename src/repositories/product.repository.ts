import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product, ProductDocument } from 'src/schemas/Product.schema';
import * as slug from 'slug';
import {
  BadRequestException,
  NotFoundException,
} from '@nestjs/common/exceptions';

@Injectable()
export class ProductRepository {
  constructor(
    @InjectModel(Product.name) private readonly model: Model<ProductDocument>,
  ) {}

  async save(reqBody: Product): Promise<Product> {
    return this.model.create({ ...reqBody, product_slug: slug(reqBody.name) });
  }

  async findProdBySlug(product_slug: string): Promise<Product> {
    let product;
    try {
      product = await this.model
        .findOne({ product_slug })
        .populate({ path: 'category', select: ['name', 'category_slug'] })
        .populate({ path: 'brand', select: ['name'] })
        .populate({ path: 'supplier', select: ['name', 'country'] })
        .exec();
    } catch (error) {
      throw new BadRequestException(error);
    }

    if (!product) {
      throw new NotFoundException('product not found');
    }

    return product;
  }

  async updateProdBySlug(
    product_slug: string,
    reqBody: Product,
  ): Promise<Product> {
    let product;

    if (reqBody.name) {
      reqBody.product_slug = slug(reqBody.name);
    }

    try {
      product = await this.model
        .findOneAndUpdate({ product_slug }, reqBody, { new: true })
        .populate({ path: 'category', select: ['name', 'category_slug'] })
        .populate({ path: 'brand', select: ['name'] })
        .populate({ path: 'supplier', select: ['name', 'country'] })
        .exec();
    } catch (error) {
      throw new BadRequestException(error);
    }

    if (!product) {
      throw new NotFoundException('product not found');
    }

    return product;
  }
}
