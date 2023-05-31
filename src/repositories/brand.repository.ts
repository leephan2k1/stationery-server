import { ObjectId } from 'mongodb';
import { Model } from 'mongoose';
import { Brand, BrandDocument } from 'src/schemas/Brand.schema';

import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class BrandRepository {
  constructor(
    @InjectModel(Brand.name) private readonly model: Model<BrandDocument>,
  ) {}

  async save(brand: Brand): Promise<Brand> {
    return this.model.create(brand);
  }

  async findById(id: string): Promise<Brand> {
    let brand;

    try {
      brand = await this.model.findById(new ObjectId(id)).exec();
    } catch (error) {
      throw new BadRequestException(error);
    }

    if (!brand) {
      throw new NotFoundException('brand not found');
    }

    return brand;
  }
}
