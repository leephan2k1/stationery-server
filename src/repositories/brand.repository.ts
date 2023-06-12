import mongoose, { Model } from 'mongoose';
import { Brand, BrandDocument } from 'src/schemas/Brand.schema';

import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { GetBrandsQuery } from 'src/controllers/brand/get-brand.query';

@Injectable()
export class BrandRepository {
  constructor(
    @InjectModel(Brand.name) private readonly model: Model<BrandDocument>,
  ) {}

  async save(brand: Brand): Promise<Brand> {
    return this.model.create(brand);
  }

  async findAll({
    limit,
    page,
  }: GetBrandsQuery): Promise<{ brands: Brand[]; count: number }> {
    let brands, count;
    try {
      [brands, count] = await Promise.all([
        await this.model
          .find({})
          .limit(limit)
          .skip(limit * (page - 1))
          .exec(),

        this.model.count(),
      ]);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }

    return { brands, count };
  }

  async findById(id: string): Promise<Brand> {
    let brand;

    try {
      brand = await this.model.findById(new mongoose.Types.ObjectId(id)).exec();
    } catch (error) {
      throw new BadRequestException(error);
    }

    if (!brand) {
      throw new NotFoundException('brand not found');
    }

    return brand;
  }

  async updateById(id: string, brand: Brand): Promise<Brand> {
    return this.model.findByIdAndUpdate(
      new mongoose.Types.ObjectId(id),
      brand,
      {
        new: true,
      },
    );
  }

  async deleteById(id: string): Promise<Brand> {
    let brand;
    try {
      brand = await this.model
        .findByIdAndDelete(new mongoose.Types.ObjectId(id))
        .exec();
    } catch (error) {
      throw new BadRequestException(error);
    }

    if (!brand) {
      throw new NotFoundException('brand not found');
    }

    return brand;
  }
}
